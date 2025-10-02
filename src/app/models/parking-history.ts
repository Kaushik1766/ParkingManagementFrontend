export interface ParkingHistoryRecord {
  TicketId: string;
  NumberPlate: string;
  BuildingId: string;
  FLoorNumber: number;
  SlotNumber: number;
  StartTime: string;
  EndTime: string;
  VechicleType: number; // 0 = TwoWheeler, 1 = FourWheeler
}

export enum VehicleTypeEnum {
  TwoWheeler = 0,
  FourWheeler = 1
}