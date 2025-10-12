import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  matDirectionsBikeOutline,
  matDeleteOutline,
  matDirectionsCarOutline
} from '@ng-icons/material-icons/outline'
import { ButtonModule } from 'primeng/button';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { VehicleResponse, VehicleType } from '../../../models/vehicle';

@Component({
  selector: 'app-user-vehicle',
  imports: [
    TitleCasePipe,

    NgIcon,
    ButtonModule
  ],
  templateUrl: './user-vehicle.component.html',
  styleUrl: './user-vehicle.component.scss',
  viewProviders: [provideIcons({
    matDirectionsBikeOutline,
    matDeleteOutline,
    matDirectionsCarOutline
  })]
})
export class UserVehicleComponent {
  vehicle = input.required<VehicleResponse>();

  onDelete = output<string>();
  onPark = output<string>();
  onUnpark = output<string>();


  get vehicleIcon(): string {
    return this.vehicle().vehicle_type === VehicleType.FourWheeler ? "matDirectionsCarOutline" : "matDirectionsBikeOutline"
  }

  get parkingStatusText(): string {
    return this.vehicle().is_parked ? 'Unpark' : 'Park';
  }

  get parkingStatusSeverity(): 'primary' | 'secondary' {
    return this.vehicle().is_parked ? 'secondary' : 'primary';
  }

  handleDelete(): void {
    this.onDelete.emit(this.vehicle().number_plate)
  }

  toggleParking(): void {
    if (this.vehicle().is_parked) {
      this.onUnpark.emit(this.vehicle().number_plate);
    } else {
      this.onPark.emit(this.vehicle().number_plate);
    }
  }
}
