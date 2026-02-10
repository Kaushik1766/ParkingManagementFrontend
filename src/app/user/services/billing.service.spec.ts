import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BillingService } from './billing.service';
import { Bill } from '../../models/bill';

describe('BillingService', () => {
  let service: BillingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(BillingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch bill with month and year params', () => {
    const mockBill: Bill = {
      parking_history: [],
      total_amount: 123,
      bill_date: '2024-01-31',
      user_id: 'u1',
    };

    service.getBill(1, 2024).subscribe((resp) => {
      expect(resp).toEqual(mockBill);
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'billing' && request.params.get('month') === '1' && request.params.get('year') === '2024'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBill);
  });
});
