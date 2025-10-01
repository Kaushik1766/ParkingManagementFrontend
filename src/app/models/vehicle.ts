// export interface Vehicle {
//   id: string;
//   numberplate: string;
//   vehicleType: VehicleType;
//   isParked: boolean;
//   parkingSlot: ParkingSlot;
// }
//
// export interface ParkingSlot {
//   slotNumber: string;
//   floor: number;
//   building: string;
//   parkedSince?: Date;
// }
//
// export enum VehicleType {
//   TWO_WHEELER = 'two-wheeler',
//   FOUR_WHEELER = 'four-wheeler'
// }
//
// export const VEHICLE_ICONS: Record<VehicleType, string> = {
//   [VehicleType.TWO_WHEELER]: 'matDirectionsBikeOutline',
//   [VehicleType.FOUR_WHEELER]: 'matDirectionsCarOutline'
// };
//
export interface VehicleResponse {
  number_plate: string;
  vehicle_type: VehicleType;
  is_parked: boolean;
  assigned_slot_number: number;
  assigned_floor_number: number;
  assigned_building_name: string;
  assigned_building_id: string;
}

export enum VehicleType {
  TwoWheeler = "TwoWheeler",
  FourWheeler = "FourWheeler"
}

export interface ParkVehicleResponse {
  ticketId: string
}
