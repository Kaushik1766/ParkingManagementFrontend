import { Component } from '@angular/core';
import { UserVehicleComponent } from './user-vehicle/user-vehicle.component';
import { Vehicle, VehicleType, ParkingSlot } from '../../models/vehicle';

@Component({
  selector: 'app-vehicles',
  imports: [UserVehicleComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [
    {
      id: '1',
      numberplate: 'up32kl8888',
      vehicleType: VehicleType.TWO_WHEELER,
      isParked: true,
      parkingSlot: {
        slotNumber: '2W01',
        floor: 1,
        building: 'Main Building',
        parkedSince: new Date('2024-01-15T09:30:00')
      }
    },
    {
      id: '2',
      numberplate: 'up32kl8888',
      vehicleType: VehicleType.FOUR_WHEELER,
      isParked: false,
      parkingSlot: {
        slotNumber: '2W01',
        floor: 1,
        building: 'Main Building',
        parkedSince: new Date('2024-01-15T09:30:00')
      }
    },
    {
      id: '6',
      numberplate: 'up32kl8888',
      vehicleType: VehicleType.FOUR_WHEELER,
      isParked: false,
      parkingSlot: {
        slotNumber: '2W01',
        floor: 1,
        building: 'Main Building',
        parkedSince: new Date('2024-01-15T09:30:00')
      }
    },
    {
      id: '4',
      numberplate: 'up32kl8888',
      vehicleType: VehicleType.FOUR_WHEELER,
      isParked: false,
      parkingSlot: {
        slotNumber: '2W01',
        floor: 1,
        building: 'Main Building',
        parkedSince: new Date('2024-01-15T09:30:00')
      }
    },
    {
      id: '3',
      numberplate: 'up32kl8888',
      vehicleType: VehicleType.TWO_WHEELER,
      isParked: true,
      parkingSlot: {
        slotNumber: '2W05',
        floor: 2,
        building: 'Annex',
        parkedSince: new Date('2024-01-14T14:20:00')
      }
    }
  ];

  onVehicleDelete(vehicleId: string): void {
    console.log('Delete vehicle:', vehicleId);
    this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
  }

  onVehiclePark(vehicleId: string): void {
    console.log('Park vehicle:', vehicleId);
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      vehicle.isParked = true;
      vehicle.parkingSlot = {
        slotNumber: 'AUTO01',
        floor: 1,
        building: 'Main Building',
        parkedSince: new Date()
      };
    }
  }

  onVehicleUnpark(vehicleId: string): void {
    console.log('Unpark vehicle:', vehicleId);
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      vehicle.isParked = false;
      // vehicle.parkingSlot = undefined;
    }
  }
}
