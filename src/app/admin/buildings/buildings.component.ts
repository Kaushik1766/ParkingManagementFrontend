import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BuildingService } from '../../services/building.service';
import { Building } from '../../models/building';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-buildings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule
  ],
  templateUrl: './buildings.component.html',
  styleUrl: './buildings.component.scss',
  providers: [MessageService]
})
export class BuildingsComponent implements OnInit {
  private buildingService = inject(BuildingService);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  buildings: Building[] = [];
  isLoading = false;
  isAddingBuilding = false;

  addBuildingForm = new FormGroup({
    buildingName: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  ngOnInit(): void {
    this.loadBuildings();
  }

  loadBuildings(): void {
    this.isLoading = true;
    const subscription = this.buildingService.getBuildings().subscribe({
      next: (buildings) => {
        this.buildings = buildings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading buildings:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load buildings'
        });
        this.isLoading = false;
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddBuilding(): void {
    if (this.addBuildingForm.valid) {
      this.isAddingBuilding = true;
      const buildingName = this.addBuildingForm.value.buildingName!;

      const subscription = this.buildingService.createBuilding({ name: buildingName }).subscribe({
        next: (newBuilding) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Building "${newBuilding.name}" created successfully`
          });
          this.addBuildingForm.reset();
          this.loadBuildings();
          this.isAddingBuilding = false;
        },
        error: (error) => {
          console.error('Error creating building:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create building'
          });
          this.isAddingBuilding = false;
        }
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }

  get isBuildingNameInvalid(): boolean {
    return this.addBuildingForm.controls.buildingName.invalid;
  }

}