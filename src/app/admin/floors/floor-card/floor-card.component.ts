import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FloorResponse } from '../../../models/floor';

@Component({
  selector: 'app-floor-card',
  imports: [
    CommonModule,

    ButtonModule,
    TagModule
  ],
  templateUrl: './floor-card.component.html',
  styleUrl: './floor-card.component.scss'
})
export class FloorCardComponent {
  floor = input.required<FloorResponse>();
  
  assignOffice = output<FloorResponse>();
  viewSlots = output<FloorResponse>();

  getOccupancyPercentage(floor: FloorResponse): number {
    if (floor.totalSlots === 0) return 0;
    return Math.round(((floor.totalSlots - floor.availableSlots) / floor.totalSlots) * 100);
  }

  getOccupancySeverity(percentage: number): 'success' | 'warn' | 'danger' {
    if (percentage < 50) return 'success';
    if (percentage < 80) return 'warn';
    return 'danger';
  }

  onAssignOffice(): void {
    this.assignOffice.emit(this.floor());
  }

  onViewSlots(): void {
    this.viewSlots.emit(this.floor());
  }
}
