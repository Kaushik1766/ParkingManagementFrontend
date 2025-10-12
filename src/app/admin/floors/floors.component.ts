import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from "primeng/floatlabel";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { CreateFloorRequest, FloorResponse } from '../../models/floor';
import { COMMON_MESSAGES } from '../../../config/common';
import { FLOORS_MESSAGES } from '../../../config/floors';
import { FloorService } from '../services/floor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FloorCardComponent } from './floor-card/floor-card.component';

@Component({
  selector: 'app-floors',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FloatLabel,
    ButtonModule,
    InputNumberModule,
    CardModule,
    TagModule,
    ToastModule,
    DialogModule,
    InputTextModule,

    LoaderComponent,
    FloorCardComponent
  ],
  templateUrl: './floors.component.html',
  styleUrl: './floors.component.scss',
  providers: [MessageService]
})
export class FloorsComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private floorService = inject(FloorService);

  isLoading = false;
  buildingId = '';
  floors: FloorResponse[] = [];
  isAddingFloor = false;

  showAssignOfficeDialog = false;
  selectedFloor: FloorResponse | null = null;
  isAssigningOffice = false;

  floorFormGroup = new FormGroup({
    floorNumber: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(0)
      ],
      updateOn: 'change'
    })
  });

  assignOfficeFormGroup = new FormGroup({
    officeName: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2)
      ],
      updateOn: 'change'
    })
  });

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.buildingId = params['buildingId'];
      this.loadFloors();
    });

  }

  loadFloors() {
    this.isLoading = true;
    this.floorService.getAllFloors(this.buildingId).subscribe({
      next: (floors) => {
        this.floors = floors;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onAddFloor() {
    if (this.floorFormGroup.valid) {
      this.isLoading = true;
      this.floorService.addFloor(this.buildingId, this.floorFormGroup.value.floorNumber!).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: COMMON_MESSAGES.TOAST.SUCCESS_SUMMARY,
            detail: FLOORS_MESSAGES.TOAST.ADDED_SUCCESS(this.floorFormGroup.value.floorNumber!)
          });
          this.floorFormGroup.reset();
          this.isLoading = false;
          this.loadFloors();
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: COMMON_MESSAGES.TOAST.ERROR_SUMMARY,
            detail: err.error.message
          });
          this.isLoading = false;
          this.floorFormGroup.reset();
        }
      })
    }
  }

  get isFormValid(): boolean {
    return this.floorFormGroup.valid;
  }

  get floorNumberError(): string | null {
    const control = this.floorFormGroup.get('floorNumber');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) {
  return FLOORS_MESSAGES.ERRORS.FLOOR_REQUIRED;
      }
      if (control.errors['min']) {
  return FLOORS_MESSAGES.ERRORS.FLOOR_MIN;
      }
    }
    return null;
  }

  onAssignOffice(floor: FloorResponse): void {
    this.selectedFloor = floor;
    this.showAssignOfficeDialog = true;
    this.assignOfficeFormGroup.reset();
  }

  onConfirmAssignOffice(): void {
    if (this.assignOfficeFormGroup.valid && this.selectedFloor) {
      this.isAssigningOffice = true;
      const officeName = this.assignOfficeFormGroup.value.officeName!;
      this.floorService.assignOffice(this.buildingId, this.selectedFloor.floorNumber, officeName).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: COMMON_MESSAGES.TOAST.SUCCESS_SUMMARY,
            detail: FLOORS_MESSAGES.TOAST.OFFICE_ASSIGNED_SUCCESS(officeName, this.selectedFloor?.floorNumber!)
          });
          this.isAssigningOffice = false;
          this.showAssignOfficeDialog = false;
          this.selectedFloor = null;
          this.assignOfficeFormGroup.reset();
          this.loadFloors();
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: COMMON_MESSAGES.TOAST.ERROR_SUMMARY,
            detail: err.error.message
          });
          this.isAssigningOffice = false;
        }
      });
    }
  }

  onCancelAssignOffice(): void {
    this.showAssignOfficeDialog = false;
    this.selectedFloor = null;
    this.assignOfficeFormGroup.reset();
  }

  get officeNameError(): string | null {
    const control = this.assignOfficeFormGroup.get('officeName');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) {
  return FLOORS_MESSAGES.ERRORS.OFFICE_NAME_REQUIRED;
      }
      if (control.errors['minLength']) {
  return FLOORS_MESSAGES.ERRORS.OFFICE_NAME_MIN;
      }
    }
    return null;
  }

  get isAssignOfficeFormValid(): boolean {
    return this.assignOfficeFormGroup.valid;
  }

  onViewSlots(floor: FloorResponse): void {
    this.router.navigate(['/admin/buildings', this.buildingId, 'floors', floor.floorNumber, 'slots']);
  }
}
