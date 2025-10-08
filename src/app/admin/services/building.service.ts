import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Building } from '../../models/building';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private httpClient = inject(HttpClient)

  constructor() { }

  addBuilding(buildingName: string) {
    return this.httpClient.post('buildings', {
      buildingName: buildingName
    })
  }

  getAllBuildings() {
    return this.httpClient.get<Building[]>('buildings').pipe(
      map(res => res.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }
}
