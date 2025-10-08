import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Building } from '../../models/building';
import { FloorResponse } from '../../models/floor';
import { SlotResponse } from '../../models/slot';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { SlotService } from '../services/slot.service';

interface BuildingHierarchy extends Building {
  floors?: FloorHierarchy[];
  isLoadingFloors?: boolean;
}

interface FloorHierarchy extends FloorResponse {
  slots?: SlotResponse[];
  isLoadingSlots?: boolean;
}

@Component({
  selector: 'app-hierarchy',
  imports: [
    CommonModule,
    AccordionModule,
    CardModule,
    ChipModule,
    TagModule,
    SkeletonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './hierarchy.component.html',
  styleUrl: './hierarchy.component.scss'
})
export class HierarchyComponent implements OnInit {
  private buildingService = inject(BuildingService);
  private floorService = inject(FloorService);
  private slotService = inject(SlotService);
  private messageService = inject(MessageService);

  buildings: BuildingHierarchy[] = [];
  isLoadingBuildings = true;

  ngOnInit() {
    this.loadBuildings();
  }

  loadBuildings() {
    this.isLoadingBuildings = true;
    this.buildingService.getAllBuildings().subscribe({
      next: (buildings) => {
        this.buildings = buildings.map(b => ({ ...b, floors: undefined, isLoadingFloors: false }));
        this.isLoadingBuildings = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load buildings'
        });
        this.isLoadingBuildings = false;
      }
    });
  }

  onBuildingExpand(building: BuildingHierarchy) {
    console.log('Building expanded:', building.name);
    if (!building.floors) {
      this.loadFloorsForBuilding(building);
    }
  }

  loadFloorsForBuilding(building: BuildingHierarchy) {
    console.log('Loading floors for building:', building.buildingId);
    building.isLoadingFloors = true;
    this.floorService.getAllFloors(building.buildingId).subscribe({
      next: (floors) => {
        console.log('Floors loaded:', floors);
        building.floors = floors.map(f => ({ ...f, slots: undefined, isLoadingSlots: false }));
        building.isLoadingFloors = false;
      },
      error: (error) => {
        console.error('Error loading floors:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to load floors for ${building.name}`
        });
        building.isLoadingFloors = false;
      }
    });
  }

  onFloorExpand(building: BuildingHierarchy, floor: FloorHierarchy) {
    console.log('Floor expanded:', floor.floorNumber);
    if (!floor.slots) {
      this.loadSlotsForFloor(building, floor);
    }
  }

  loadSlotsForFloor(building: BuildingHierarchy, floor: FloorHierarchy) {
    console.log('Loading slots for floor:', floor.floorNumber);
    floor.isLoadingSlots = true;
    this.slotService.getAllSlots(building.buildingId, floor.floorNumber.toString()).subscribe({
      next: (slots) => {
        console.log('Slots loaded:', slots);
        floor.slots = slots;
        floor.isLoadingSlots = false;
      },
      error: (error) => {
        console.error('Error loading slots:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to load slots for Floor ${floor.floorNumber}`
        });
        floor.isLoadingSlots = false;
      }
    });
  }

  getOccupancyPercentage(floor: FloorHierarchy): number {
    if (floor.totalSlots === 0) return 0;
    return Math.round(((floor.totalSlots - floor.availableSlots) / floor.totalSlots) * 100);
  }

  getOccupancySeverity(percentage: number): 'success' | 'warn' | 'danger' {
    if (percentage < 50) return 'success';
    if (percentage < 80) return 'warn';
    return 'danger';
  }

  getSlotStatusClass(slot: SlotResponse): string {
    return slot.isAssigned && slot.parkingStatus ? 'occupied' : 'available';
  }

  getSlotIcon(slot: SlotResponse): string {
    return slot.slotType === 'TwoWheeler' ? 'pi-car' : 'pi-truck';
  }
}
