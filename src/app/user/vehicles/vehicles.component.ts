import { Component, inject, OnInit, signal } from '@angular/core';
import { UserVehicleComponent } from './user-vehicle/user-vehicle.component';
import { VehicleResponse } from '../../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from "primeng/message";

@Component({
  selector: 'app-vehicles',
  imports: [UserVehicleComponent, ToastModule, LoaderComponent, ReactiveFormsModule, ButtonModule, FloatLabel, SelectModule, InputTextModule, Message],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  providers: [MessageService]
})
export class VehiclesComponent implements OnInit {
  private vehicleService = inject(VehicleService)
  private messageService = inject(MessageService)

  vehicles: VehicleResponse[] = []
  isLoading = signal(false)

  vehicleTypes: {
    vehicleType: string,
    value: number
  }[] = [
      { vehicleType: 'TwoWheeler', value: 0 },
      { vehicleType: 'FourWheeler', value: 1 }
    ]

  vehicleForm = new FormGroup({
    numberPlate: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      updateOn: 'blur'
    }),
    vehicleType: new FormControl(-1, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(1),
      ],
      updateOn: 'blur'
    })
  })

  addVehicle() {
    if (this.vehicleForm.valid) {
      this.isLoading.set(true)
      this.vehicleService.addVehicle(this.vehicleForm.value.numberPlate!, this.vehicleForm.value.vehicleType!)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Vehicle added successfully',
              life: 10000,
            });
            this.vehicleForm.reset()
            this.vehicleForm.controls.vehicleType.setValue(-1)
            this.loadVehicles()
            this.isLoading.set(false)
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading.set(false)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 10000 });
          }
        })
    }
  }

  ngOnInit() {
    this.loadVehicles();
  }

  onVehicleDelete(numberplate: string): void {
    this.isLoading.set(true)
    this.vehicleService.deleteVehicle(numberplate).subscribe({
      next: () => {
        this.messageService.add({
          life: 10000,
          severity: 'success',
          summary: 'Success',
          detail: `Vehicle deleted successfully`
        })
        this.loadVehicles();
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 10000 });
      }
    })
  }

  onVehiclePark(numberplate: string) {
    this.isLoading.set(true);
    this.vehicleService.parkVehicle(numberplate).subscribe({
      next: val => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Vehicle ${numberplate} parked successfully with Ticket ID: ${val.ticketId}`,
          life: 5000,
        });
        this.loadVehicles();
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 10000 });
      }
    })
  }

  onVehicleUnpark(numberplate: string): void {
    this.isLoading.set(true);
    this.vehicleService.unparkVehicle(numberplate).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Vehicle unparked successfully`,
          life: 5000,
        });
        this.loadVehicles();
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 10000 });
      }
    })
  }

  private loadVehicles() {
    this.isLoading.set(true)
    this.vehicleService.getRegisteredVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles
        this.isLoading.set(false)
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 10000 });
      }
    })
  }

  get isNumberPlateInvalid(): boolean {
    return this.vehicleForm.controls.numberPlate.invalid && this.vehicleForm.controls.numberPlate.dirty;
  }

  get isVehicleTypeInvalid(): boolean {
    return this.vehicleForm.controls.vehicleType.invalid && this.vehicleForm.controls.vehicleType.dirty;
  }
}
