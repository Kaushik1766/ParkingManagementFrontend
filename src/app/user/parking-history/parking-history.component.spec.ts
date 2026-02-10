import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { ParkingHistory } from '../../models/parking-history';
import { ParkingHistoryComponent } from './parking-history.component';
import { ParkingHistoryService } from '../services/parking-history.service';

const historyMock: ParkingHistory[] = [
  {
    TicketId: 'T1',
    NumberPlate: 'ABC123',
    BuildingId: 'B1',
    BuildingName: 'Main',
    FLoorNumber: 2,
    SlotNumber: 10,
    StartTime: '2023-01-01T10:00:00Z',
    EndTime: '2023-01-01T11:30:00Z',
    VechicleType: 'TwoWheeler',
  },
];

describe('ParkingHistoryComponent', () => {
  let parkingHistoryServiceMock: jasmine.SpyObj<ParkingHistoryService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    parkingHistoryServiceMock = jasmine.createSpyObj('ParkingHistoryService', ['getParkingHistory']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [ParkingHistoryComponent, RouterTestingModule],
    }).overrideComponent(ParkingHistoryComponent, {
      set: {
        template: '',
        providers: [
          { provide: ParkingHistoryService, useValue: parkingHistoryServiceMock },
          { provide: MessageService, useValue: messageServiceMock },
        ],
      },
    });
  });

  it('should load history on init', () => {
    parkingHistoryServiceMock.getParkingHistory.and.returnValue(of(historyMock));

    const fixture = TestBed.createComponent(ParkingHistoryComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(parkingHistoryServiceMock.getParkingHistory).toHaveBeenCalled();
    expect(component.parkingHistory).toEqual(historyMock);
    expect(component.isLoading).toBeFalse();
  });

  it('should filter history by number plate', () => {
    parkingHistoryServiceMock.getParkingHistory.and.returnValue(of(historyMock));
    const fixture = TestBed.createComponent(ParkingHistoryComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.numberplateFilter = 'ABC';
    expect(component.filteredHistory.length).toBe(1);

    component.numberplateFilter = 'ZZZ';
    expect(component.filteredHistory.length).toBe(0);
  });

  it('should show error toast and stop loading on failure', () => {
    parkingHistoryServiceMock.getParkingHistory.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'Fail' } }))
    );

    const fixture = TestBed.createComponent(ParkingHistoryComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'error', detail: 'Fail' })
    );
    expect(component.isLoading).toBeFalse();
  });
});
