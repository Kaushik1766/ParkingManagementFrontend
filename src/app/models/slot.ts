export interface SlotOverview {
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  occupancyPercentage: number;
  twoWheelerStats: {
    total: number;
    available: number;
    occupied: number;
  };
  fourWheelerStats: {
    total: number;
    available: number;
    occupied: number;
  };
}

export interface SlotResponse {
  buildingId: string;
  floorNumber: number;
  slotNumber: number;
  slotType: "TwoWheeler" | "FourWheeler";
  isAssigned: boolean;
  isOccupied: boolean;
  parkingStatus?: {
    numberPlate: string;
    parkedAt: string;
    userName: string;
    userEmail: string;
  }
}
