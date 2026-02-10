import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OfficeService } from './office.service';
import { Office } from '../models/office';

describe('OfficeService', () => {
  let service: OfficeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OfficeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch offices', () => {
    const offices: Office[] = [
      { building_id: 'b1', floor_number: 1, office_name: 'HQ', office_id: 'o1' },
    ];

    service.getOffices().subscribe((resp) => {
      expect(resp).toEqual(offices);
    });

    const req = httpMock.expectOne('offices');
    expect(req.request.method).toBe('GET');
    req.flush(offices);
  });
});
