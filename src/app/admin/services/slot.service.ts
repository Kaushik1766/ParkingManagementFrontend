import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SlotResponse } from '../../models/slot';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getAllSlots(buildingId: string, floorId: string) {
    return this.httpClient.get<SlotResponse[]>(`buildings/${buildingId}/floors/${floorId}/slots`);
  }
}
