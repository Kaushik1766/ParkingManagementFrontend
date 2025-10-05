export interface ParkingHistory {
  TicketId: string;
  NumberPlate: string;
  BuildingId: string;
  BuildingName: string;
  FLoorNumber: number;
  SlotNumber: number;
  StartTime: string;
  EndTime: string;
  VechicleType: string; // 0 = TwoWheeler, 1 = FourWheeler
}

export enum VehicleTypeEnum {
  TwoWheeler = 0,
  FourWheeler = 1
}
