import { Component, input } from '@angular/core';
import { ParkingHistory, VehicleTypeEnum } from '../../../models/parking-history';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { Divider } from "primeng/divider";

@Component({
  selector: 'app-history-card',
  imports: [TagModule, ChipModule, Divider],
  templateUrl: './history-card.component.html',
  styleUrl: './history-card.component.scss'
})
export class HistoryCardComponent {
  history = input.required<ParkingHistory>();

  getVehicleTypeIcon(vehicleType: string): string {
    return vehicleType == "TwoWheeler" ? 'pi-circle' : 'pi-stop';
  }

  getVehicleTypeSeverity(vehicleType: string): 'info' | 'help' {
    return vehicleType == "TwoWheeler" ? 'info' : 'help';
  }

  calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
