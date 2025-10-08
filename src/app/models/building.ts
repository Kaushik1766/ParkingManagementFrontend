export interface Building {
  buildingId: string;
  name: string;
  availableSlots: number;
  totalSlots: number;
  totalFloors: number;
}

export interface CreateBuildingRequest {
  name: string;
}
