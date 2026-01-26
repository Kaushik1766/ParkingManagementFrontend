import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matTwoWheeler, matDirectionsCar } from '@ng-icons/material-icons/baseline';
import { SlotResponse } from '../../../models/slot';

@Component({
  selector: 'app-slot-card',
  imports: [
    CommonModule,

    TooltipModule,
    NgIconComponent
  ],
  providers: [provideIcons({ matTwoWheeler, matDirectionsCar })],
  templateUrl: './slot-card.component.html',
  styleUrl: './slot-card.component.scss'
})
export class SlotCardComponent {
  slot = input.required<SlotResponse>();

  getSlotIcon(slot: SlotResponse): string {
    return slot.slotType === 'TwoWheeler' ? 'matTwoWheeler' : 'matDirectionsCar';
  }

  getSlotTooltip(slot: SlotResponse): string {
    if (slot.isOccupied && slot.parkingStatus) {
      const parkingDuration = this.getParkingDuration(slot.parkingStatus.parkedAt);
      return `Vehicle: ${slot.parkingStatus.numberPlate}\nOwner: ${slot.parkingStatus.userName}\nEmail: ${slot.parkingStatus.userEmail}\nParked: ${parkingDuration}`;
    }

    if (slot.isAssigned) {
      return `Slot ${slot.slotNumber} - Assigned`;
    }

    return `Slot ${slot.slotNumber} - Available`;
  }

  getParkingDuration(parkedAt: string): string {
    const now = new Date();
    const diff = now.getTime() - new Date(parkedAt).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  }
}
