import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SlotResponse, SlotOverview } from '../../models/slot';
import { SlotService } from '../services/slot.service';
import { SlotOverviewComponent } from './slot-overview/slot-overview.component';
import { SlotMapComponent } from './slot-map/slot-map.component';

@Component({
  selector: 'app-slots',
  imports: [
    CommonModule,

    ToastModule,

    SlotOverviewComponent,
    SlotMapComponent
  ],
  providers: [MessageService],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.scss'
})
export class SlotsComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private slotService = inject(SlotService);

  buildingId: string = '';
  floorId: string = '';

  slots: SlotResponse[] = [];

  overview: SlotOverview | null = null;

  isLoading: boolean = true;

  ngOnInit(): void {
    const subscription = this.activeRoute.params.subscribe((params: Params) => {
      this.buildingId = params['buildingId'];
      this.floorId = params['floorId'];

      this.loadSlots();
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  loadSlots(): void {
    this.isLoading = true;
    this.slotService.getAllSlots(this.buildingId, this.floorId).subscribe({
      next: (slots: SlotResponse[]) => {
        this.slots = slots;
        this.calculateOverview();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  calculateOverview(): void {
    const totalSlots = this.slots?.length;
    const occupiedSlots = this.slots.filter(s => s.isAssigned && s.parkingStatus).length;
    const availableSlots = totalSlots - occupiedSlots;

    const twoWheelerSlots = this.slots.filter(slot => slot.slotType === 'TwoWheeler');
    const fourWheelerSlots = this.slots.filter(slot => slot.slotType === 'FourWheeler');

    this.overview = {
      totalSlots,
      availableSlots,
      occupiedSlots,
      occupancyPercentage: totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0,
      twoWheelerStats: {
        total: twoWheelerSlots.length,
        available: twoWheelerSlots.filter(s => !s.isAssigned || !s.parkingStatus).length,
        occupied: twoWheelerSlots.filter(s => s.isAssigned && s.parkingStatus).length
      },
      fourWheelerStats: {
        total: fourWheelerSlots.length,
        available: fourWheelerSlots.filter(s => !s.isAssigned || !s.parkingStatus).length,
        occupied: fourWheelerSlots.filter(s => s.isAssigned && s.parkingStatus).length
      }
    };
  }
}
