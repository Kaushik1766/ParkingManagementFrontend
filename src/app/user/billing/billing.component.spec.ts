import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Bill } from '../../models/bill';
import { BillingComponent } from './billing.component';
import { BillingService } from '../services/billing.service';

const billMock: Bill = {
  parking_history: [],
  total_amount: 123,
  bill_date: '2024-01-31',
  user_id: 'u1',
};

describe('BillingComponent', () => {
  let billingServiceMock: jasmine.SpyObj<BillingService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    billingServiceMock = jasmine.createSpyObj('BillingService', ['getBill']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [BillingComponent],
    }).overrideComponent(BillingComponent, {
      set: {
        template: '',
        providers: [
          { provide: BillingService, useValue: billingServiceMock },
          { provide: MessageService, useValue: messageServiceMock },
        ],
      },
    });
  });

  it('should load bill on init and stop loading', () => {
    billingServiceMock.getBill.and.returnValue(of(billMock));

    const fixture = TestBed.createComponent(BillingComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(billingServiceMock.getBill).toHaveBeenCalledWith(component.selectedMonth, component.selectedYear);
    expect(component.bill).toEqual(billMock);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error and stop loading', () => {
    billingServiceMock.getBill.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'fail' } }))
    );

    const fixture = TestBed.createComponent(BillingComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'error', detail: 'fail' })
    );
    expect(component.bill).toBeNull();
    expect(component.isLoading).toBeFalse();
  });

  it('should update available months for past and current year', () => {
    const fixture = TestBed.createComponent(BillingComponent);
    const component = fixture.componentInstance;

    // Past year should expose all months
    component.selectedYear = 2000;
    component.updateAvailableMonths();
    expect(component.availableMonths.length).toBe(12);

    // Current year should limit to current month
    const now = new Date();
    component.selectedYear = now.getFullYear();
    component.updateAvailableMonths();
    expect(component.availableMonths.length).toBe(now.getMonth() + 1);
  });
});
