export interface Building {
  id: string;
  name: string;
  floors: Floor[];
  totalSlots: number;
  availableSlots: number;
}

export interface Floor {
  id: string;
  floorNumber: number;
  buildingId: string;
  slots: Slot[];
  totalSlots: number;
  availableSlots: number;
}

export interface Slot {
  id: string;
  slotNumber: string;
  floorId: string;
  buildingId: string;
  isOccupied: boolean;
  vehicleType: 'two-wheeler' | 'four-wheeler';
  occupiedBy?: string; // vehicle id
  occupiedSince?: Date;
}

export interface CreateBuildingRequest {
  name: string;
}