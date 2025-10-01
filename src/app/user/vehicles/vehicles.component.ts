import { Component, inject, OnInit, signal } from '@angular/core';
import { UserVehicleComponent } from './user-vehicle/user-vehicle.component';
import { VehicleResponse } from '../../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-vehicles',
  imports: [UserVehicleComponent, ToastModule, LoaderComponent, ReactiveFormsModule, ButtonModule, FloatLabel, SelectModule, InputTextModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  providers: [MessageService]
})
export class VehiclesComponent implements OnInit {
  private vehicleService = inject(VehicleService)
  private messageService = inject(MessageService)

  vehicles: VehicleResponse[] = []
  isLoading = signal(false)

  vehicleForm = new FormGroup({
    numberPlate: new FormGroup('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]
    }),
    vehicleType: new FormGroup('')
  })

  addVehicle() {
  }

  ngOnInit(): void {
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

  onVehicleDelete(numberplate: string): void {
    throw new Error('Method not implemented.');
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
        this.vehicles = this.vehicles.map(v => {
          if (v.number_plate === numberplate) {
            return { ...v, is_parked: true };
          }
          return v;
        })
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
        this.vehicles = this.vehicles.map(v => {
          if (v.number_plate === numberplate) {
            return { ...v, is_parked: false };
          }
          return v;
        })
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 10000 });
      }
    })
  }
}
