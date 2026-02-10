import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MessageService, ConfirmationService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { VehicleResponse } from '../../models/vehicle';
import { VehiclesComponent } from './vehicles.component';
import { VehicleService } from '../services/vehicle.service';

describe('VehiclesComponent', () => {
  let vehicleServiceMock: jasmine.SpyObj<VehicleService>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  let confirmationServiceMock: jasmine.SpyObj<ConfirmationService>;

  const vehiclesMock: VehicleResponse[] = [
    {
      number_plate: 'ABC1234567',
      vehicle_type: 'TwoWheeler' as any,
      is_parked: false,
      assigned_slot_number: 1,
      assigned_floor_number: 1,
      assigned_building_name: 'Main',
      assigned_building_id: 'B1',
    },
  ];

  beforeEach(() => {
    vehicleServiceMock = jasmine.createSpyObj('VehicleService', [
      'getRegisteredVehicles',
      'addVehicle',
      'deleteVehicle',
      'parkVehicle',
      'unparkVehicle',
    ]);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    confirmationServiceMock = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    vehicleServiceMock.getRegisteredVehicles.and.returnValue(of(vehiclesMock));

    TestBed.configureTestingModule({
      imports: [VehiclesComponent],
    }).overrideComponent(VehiclesComponent, {
      set: {
        template: '',
        providers: [
          { provide: VehicleService, useValue: vehicleServiceMock },
          { provide: MessageService, useValue: messageServiceMock },
          { provide: ConfirmationService, useValue: confirmationServiceMock },
        ],
      },
    });
  });

  it('should load vehicles on init', () => {
    const fixture = TestBed.createComponent(VehiclesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(vehicleServiceMock.getRegisteredVehicles).toHaveBeenCalled();
    expect(component.vehicles).toEqual(vehiclesMock);
    expect(component.isLoading()).toBeFalse();
  });

  it('should show error when loadVehicles fails', () => {
    vehicleServiceMock.getRegisteredVehicles.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'fail' } }))
    );

    const fixture = TestBed.createComponent(VehiclesComponent);
    fixture.detectChanges();

    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'error' })
    );
  });

  it('should add vehicle and refresh list', () => {
    vehicleServiceMock.addVehicle.and.returnValue(of({}));
    vehicleServiceMock.getRegisteredVehicles.and.returnValue(of([]));

    const fixture = TestBed.createComponent(VehiclesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.vehicleForm.setValue({ numberPlate: 'ABC1234567', vehicleType: 0 });
    component.addVehicle();

    expect(vehicleServiceMock.addVehicle).toHaveBeenCalledWith('ABC1234567', 0);
    expect(vehicleServiceMock.getRegisteredVehicles).toHaveBeenCalledTimes(2);
    expect(component.isLoading()).toBeFalse();
    expect(component.vehicleForm.controls.vehicleType.value).toBe(-1);
  });

  it('should handle addVehicle error', () => {
    vehicleServiceMock.addVehicle.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'error' } }))
    );

    const fixture = TestBed.createComponent(VehiclesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.vehicleForm.setValue({ numberPlate: 'ABC1234567', vehicleType: 0 });
    component.addVehicle();

    expect(messageServiceMock.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ severity: 'error', detail: 'error' })
    );
    expect(component.isLoading()).toBeFalse();
  });

  it('should delete vehicle after confirmation', () => {
    vehicleServiceMock.deleteVehicle.and.returnValue(of({}));
    vehicleServiceMock.getRegisteredVehicles.and.returnValue(of([]));
    confirmationServiceMock.confirm.and.callFake((opts) => opts.accept && opts.accept());

    const fixture = TestBed.createComponent(VehiclesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.onVehicleDelete('ABC1234567');

    expect(vehicleServiceMock.deleteVehicle).toHaveBeenCalledWith('ABC1234567');
    expect(component.isLoading()).toBeFalse();
  });

  it('should park vehicle', () => {
    vehicleServiceMock.parkVehicle.and.returnValue(of({ ticketId: 't1' }));
    vehicleServiceMock.getRegisteredVehicles.and.returnValue(of([]));

    const fixture = TestBed.createComponent(VehiclesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.onVehiclePark('ABC1234567');

    expect(vehicleServiceMock.parkVehicle).toHaveBeenCalledWith('ABC1234567');
    expect(component.isLoading()).toBeFalse();
  });

  it('should unpark vehicle', () => {
    vehicleServiceMock.unparkVehicle.and.returnValue(of({}));
    vehicleServiceMock.getRegisteredVehicles.and.returnValue(of([]));

    const fixture = TestBed.createComponent(VehiclesComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.onVehicleUnpark('ABC1234567');

    expect(vehicleServiceMock.unparkVehicle).toHaveBeenCalledWith('ABC1234567');
    expect(component.isLoading()).toBeFalse();
  });
});
