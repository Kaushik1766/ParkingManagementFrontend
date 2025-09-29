export interface Vehicle {
  id: string;
  numberplate: string;
  vehicleType: VehicleType;
  isParked: boolean;
  parkingSlot: ParkingSlot;
}

export interface ParkingSlot {
  slotNumber: string;
  floor: number;
  building: string;
  parkedSince?: Date;
}

export enum VehicleType {
  TWO_WHEELER = 'two-wheeler',
  FOUR_WHEELER = 'four-wheeler'
}

export const VEHICLE_ICONS: Record<VehicleType, string> = {
  [VehicleType.TWO_WHEELER]: 'matDirectionsBikeOutline',
  [VehicleType.FOUR_WHEELER]: 'matDirectionsCarOutline'
};