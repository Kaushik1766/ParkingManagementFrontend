import { TestBed } from '@angular/core/testing';
import { VehicleResponse, VehicleType } from '../../../models/vehicle';
import { UserVehicleComponent } from './user-vehicle.component';

describe('UserVehicleComponent', () => {
  const vehicle: VehicleResponse = {
    number_plate: 'ABC1234567',
    vehicle_type: VehicleType.FourWheeler,
    is_parked: false,
    assigned_slot_number: 1,
    assigned_floor_number: 1,
    assigned_building_name: 'Main',
    assigned_building_id: 'B1',
  };

  function createComponent(v: VehicleResponse) {
    TestBed.configureTestingModule({
      imports: [UserVehicleComponent],
    }).overrideComponent(UserVehicleComponent, {
      set: { template: '' },
    });

    const fixture = TestBed.createComponent(UserVehicleComponent);
    fixture.componentRef.setInput('vehicle', v);
    fixture.detectChanges();
    return { fixture, component: fixture.componentInstance };
  }

  it('should compute icon and parking status', () => {
    const { component } = createComponent(vehicle);

    expect(component.vehicleIcon).toBe('matDirectionsCarOutline');
    expect(component.parkingStatusText).toBe('Park');
    expect(component.parkingStatusSeverity).toBe('primary');
  });

  it('should emit delete event', (done) => {
    const { component } = createComponent(vehicle);
    component.onDelete.subscribe((plate) => {
      expect(plate).toBe('ABC1234567');
      done();
    });
    component.handleDelete();
  });

  it('should emit park when not parked', (done) => {
    const { component } = createComponent({ ...vehicle, is_parked: false });
    component.onPark.subscribe((plate) => {
      expect(plate).toBe('ABC1234567');
      done();
    });
    component.toggleParking();
  });

  it('should emit unpark when parked', (done) => {
    const { component } = createComponent({ ...vehicle, is_parked: true });
    component.onUnpark.subscribe((plate) => {
      expect(plate).toBe('ABC1234567');
      done();
    });
    component.toggleParking();
  });
});
