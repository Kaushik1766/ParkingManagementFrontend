import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  FloorResponse } from '../../models/floor';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private httpClient = inject(HttpClient);

  constructor() { }

  getAllFloors(buildingId: string) {
    return this.httpClient.get<FloorResponse[]>(`buildings/${buildingId}/floors`);
  }

  addFloor(buildingId: string, floorNumber: number) {
    return this.httpClient.post(`buildings/${buildingId}/floors`, { 
      floor_number: floorNumber
     });
  }

  assignOffice(buildingId: string, floorNumber: number, officeName: string) {
    return this.httpClient.post(`buildings/${buildingId}/offices`, {
      office_name: officeName,
      floor_number: floorNumber
    });
  }
}
