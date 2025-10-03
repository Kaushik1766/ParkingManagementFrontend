import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ParkVehicleResponse, VehicleResponse } from '../../models/vehicle';
import { catchError, map, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private httpClient = inject(HttpClient)

  constructor() { }

  getRegisteredVehicles() {
    return this.httpClient.get<VehicleResponse[]>('vehicles')
  }

  parkVehicle(numberplate: string) {
    return this.httpClient.post<ParkVehicleResponse>('parkings', {
      numberplate: numberplate,
    });
  }

  unparkVehicle(numberplate: string) {
    return this.httpClient.patch(`parkings/${numberplate}/unpark`, {})
  }

  addVehicle(numberPlate: string, vehicleType: number) {
    return this.httpClient.post('vehicles', {
      numberplate: numberPlate,
      type: vehicleType
    })
  }

  deleteVehicle(numberPlate: string) {
    return this.httpClient.delete(`vehicles/${numberPlate}`)
  }
}
