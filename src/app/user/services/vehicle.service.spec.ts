import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { ParkVehicleResponse, VehicleResponse } from '../../models/vehicle';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get registered vehicles', () => {
    const vehicles: VehicleResponse[] = [];
    service.getRegisteredVehicles().subscribe((resp) => expect(resp).toEqual(vehicles));

    const req = httpMock.expectOne('vehicles');
    expect(req.request.method).toBe('GET');
    req.flush(vehicles);
  });

  it('should park vehicle', () => {
    const response: ParkVehicleResponse = { ticketId: 't1' };
    service.parkVehicle('ABC').subscribe((resp) => expect(resp).toEqual(response));

    const req = httpMock.expectOne('parkings');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ numberplate: 'ABC' });
    req.flush(response);
  });

  it('should unpark vehicle', () => {
    service.unparkVehicle('ABC').subscribe();

    const req = httpMock.expectOne('parkings/ABC/unpark');
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });

  it('should add vehicle', () => {
    service.addVehicle('ABC', 0).subscribe();

    const req = httpMock.expectOne('vehicles');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ numberplate: 'ABC', type: 0 });
    req.flush({});
  });

  it('should delete vehicle', () => {
    service.deleteVehicle('ABC').subscribe();

    const req = httpMock.expectOne('vehicles/ABC');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
