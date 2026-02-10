import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ParkingHistoryService } from './parking-history.service';
import { ParkingHistory } from '../../models/parking-history';

describe('ParkingHistoryService', () => {
  let service: ParkingHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ParkingHistoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch parking history', () => {
    const mockHistory: ParkingHistory[] = [
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

    service.getParkingHistory().subscribe((resp) => {
      expect(resp).toEqual(mockHistory);
    });

    const req = httpMock.expectOne('parkings');
    expect(req.request.method).toBe('GET');
    req.flush(mockHistory);
  });
});
