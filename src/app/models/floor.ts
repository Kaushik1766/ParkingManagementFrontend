// export interface Floor {
//   buildingId: string;
//   floorNumber: number;
//   availableSlots: number;
//   totalSlots: number;
//   assignedOffice?: string;
// }

export interface FloorResponse {
  buildingId: string;
  floorNumber: number;
  availableSlots: number;
  totalSlots: number;
  assignedOffice?: string;
}

export interface CreateFloorRequest {
  buildingId: string;
  floorNumber: number;
}
