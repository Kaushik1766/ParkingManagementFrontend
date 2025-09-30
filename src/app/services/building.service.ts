import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Building, CreateBuildingRequest } from '../models/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private httpClient = inject(HttpClient);
  private buildingsSubject = new BehaviorSubject<Building[]>([]);

  private mockBuildings: Building[] = [
    {
      id: '1',
      name: 'fsadfasdfasdf',
      totalSlots: 100,
      availableSlots: 75,
      floors: [
        {
          id: 'f1',
          floorNumber: 1,
          buildingId: '1',
          totalSlots: 50,
          availableSlots: 40,
          slots: [
            {
              id: 's1',
              slotNumber: '2W01',
              floorId: 'f1',
              buildingId: '1',
              isOccupied: true,
              vehicleType: 'two-wheeler',
              occupiedBy: 'v1',
              occupiedSince: new Date('2024-01-15T09:30:00')
            },
            {
              id: 's2',
              slotNumber: '2W02',
              floorId: 'f1',
              buildingId: '1',
              isOccupied: false,
              vehicleType: 'two-wheeler'
            },
            {
              id: 's3',
              slotNumber: '4W01',
              floorId: 'f1',
              buildingId: '1',
              isOccupied: false,
              vehicleType: 'four-wheeler'
            }
          ]
        },
        {
          id: 'f2',
          floorNumber: 2,
          buildingId: '1',
          totalSlots: 50,
          availableSlots: 35,
          slots: [
            {
              id: 's4',
              slotNumber: '2W05',
              floorId: 'f2',
              buildingId: '1',
              isOccupied: true,
              vehicleType: 'two-wheeler',
              occupiedBy: 'v3',
              occupiedSince: new Date('2024-01-14T14:20:00')
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'advant',
      totalSlots: 80,
      availableSlots: 65,
      floors: [
        {
          id: 'f3',
          floorNumber: 1,
          buildingId: '2',
          totalSlots: 40,
          availableSlots: 32,
          slots: [
            {
              id: 's5',
              slotNumber: '4W10',
              floorId: 'f3',
              buildingId: '2',
              isOccupied: false,
              vehicleType: 'four-wheeler'
            }
          ]
        },
        {
          id: 'f4',
          floorNumber: 2,
          buildingId: '2',
          totalSlots: 40,
          availableSlots: 33,
          slots: []
        }
      ]
    }
  ];

  constructor() {
    // Initialize with mock data
    this.buildingsSubject.next(this.mockBuildings);
  }

  getBuildings(): Observable<Building[]> {
    // In a real app, this would make an HTTP request
    // return this.httpClient.get<Building[]>('buildings');
    
    // For now, return mock data
    return this.buildingsSubject.asObservable();
  }

  createBuilding(building: CreateBuildingRequest): Observable<Building> {
    // In a real app, this would make an HTTP request
    // return this.httpClient.post<Building>('buildings', building);
    
    // For now, create mock building
    const newBuilding: Building = {
      id: Date.now().toString(),
      name: building.name,
      totalSlots: 0,
      availableSlots: 0,
      floors: []
    };

    const currentBuildings = this.buildingsSubject.value;
    this.buildingsSubject.next([...currentBuildings, newBuilding]);
    
    return new Observable(observer => {
      observer.next(newBuilding);
      observer.complete();
    });
  }

  getBuildingById(id: string): Observable<Building | undefined> {
    return new Observable(observer => {
      const building = this.buildingsSubject.value.find(b => b.id === id);
      observer.next(building);
      observer.complete();
    });
  }
}