import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  matDirectionsBikeOutline,
  matDeleteOutline,
  matDirectionsCarOutline
} from '@ng-icons/material-icons/outline'
import { ButtonModule } from 'primeng/button';
import { Vehicle, VEHICLE_ICONS } from '../../../models/vehicle';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-vehicle',
  imports: [NgIcon, ButtonModule, TitleCasePipe],
  templateUrl: './user-vehicle.component.html',
  styleUrl: './user-vehicle.component.scss',
  viewProviders: [provideIcons({
    matDirectionsBikeOutline,
    matDeleteOutline,
    matDirectionsCarOutline
  })]
})
export class UserVehicleComponent {
  vehicle = input.required<Vehicle>();

  onDelete = output<string>();
  onPark = output<string>();
  onUnpark = output<string>();

  get vehicleIcon(): string {
    return VEHICLE_ICONS[this.vehicle().vehicleType];
  }

  get parkingStatusText(): string {
    return this.vehicle().isParked ? 'Unpark' : 'Park';
  }

  get parkingStatusSeverity(): 'primary' | 'secondary' {
    return this.vehicle().isParked ? 'secondary' : 'primary';
  }

  handleDelete(): void {
    this.onDelete.emit(this.vehicle().id);
  }

  handleParkingAction(): void {
    if (this.vehicle().isParked) {
      this.onUnpark.emit(this.vehicle().id);
    } else {
      this.onPark.emit(this.vehicle().id);
    }
  }
}
