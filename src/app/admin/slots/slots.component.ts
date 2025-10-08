import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { SlotResponse, SlotOverview } from '../../models/slot';
import { SlotService } from '../services/slot.service';

@Component({
  selector: 'app-slots',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TagModule,
    ChipModule,
    TooltipModule
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


  ngOnInit() {
    const subscription = this.activeRoute.params.subscribe(params => {
      this.buildingId = params['buildingId'];
      this.floorId = params['floorId'];
      
      this.loadSlots();
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  loadSlots(): void {
    this.isLoading = true;
    this.slotService.getAllSlots(this.buildingId, this.floorId).subscribe({
      next: (slots) => {
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
    const totalSlots = this.slots.length;
    const occupiedSlots = this.slots.filter(s => s.isAssigned && s.parkingStatus).length;
    const availableSlots = totalSlots - occupiedSlots;

    const twoWheelerSlots = this.slots.filter(s => s.slotType === 'TwoWheeler');
    const fourWheelerSlots = this.slots.filter(s => s.slotType === 'FourWheeler');

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

  getSlotTooltip(slot: SlotResponse): string {
    if (!slot.isAssigned || !slot.parkingStatus) {
      return `Slot ${slot.slotNumber} - Available`;
    }

    const parkingDuration = this.getParkingDuration(slot.parkingStatus.parkedAt);
    
    return `Vehicle: ${slot.parkingStatus.numberPlate}\nOwner: ${slot.parkingStatus.userName}\nEmail: ${slot.parkingStatus.userEmail}\nParked: ${parkingDuration}`;
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

  getSlotIcon(slot: SlotResponse): string {
    return slot.slotType === 'TwoWheeler' ? 'pi-car' : 'pi-truck';
  }

  getOccupancySeverity(percentage: number): 'success' | 'warning' | 'danger' {
    if (percentage < 50) return 'success';
    if (percentage < 80) return 'warning';
    return 'danger';
  }
}
