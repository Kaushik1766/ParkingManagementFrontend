import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Building } from '../../models/building';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BuildingService } from '../services/building.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { HttpErrorResponse } from '@angular/common/http';
import { BuildingCardComponent } from './building-card/building-card.component';
import { map } from 'rxjs';

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
    ToastModule,
    LoaderComponent,
    BuildingCardComponent
  ],
  templateUrl: './buildings.component.html',
  styleUrl: './buildings.component.scss',
  providers: [MessageService]
})
export class BuildingsComponent implements OnInit {
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private buildingService = inject(BuildingService)

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
    this.isLoading = true
    this.buildingService.getAllBuildings().subscribe({
      next: (val) => {
        this.buildings = val
        this.isLoading = false
      },
      error: (err: HttpErrorResponse) => {

        this.isLoading = false
      }
    })
  }

  onAddBuilding(): void {
    if (this.addBuildingForm.valid) {
      this.isLoading = true
      this.buildingService.addBuilding(this.addBuildingForm.value.buildingName!).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Building added successfully',
            life: 10000,
          });
          this.addBuildingForm.reset();
          this.isLoading = false;
          this.loadBuildings();
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
            life: 10000,
          });
        },
      })
    }
  }

  get isBuildingNameInvalid(): boolean {
    return this.addBuildingForm.controls.buildingName.invalid;
  }

}
