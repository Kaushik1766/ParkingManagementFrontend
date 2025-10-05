import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ParkingHistory } from '../../models/parking-history';

@Injectable({
  providedIn: 'root'
})
export class ParkingHistoryService {
  private httpClient = inject(HttpClient)

  constructor() { }

  getParkingHistory() {
    return this.httpClient.get<ParkingHistory[]>('parkings')
  }
}
