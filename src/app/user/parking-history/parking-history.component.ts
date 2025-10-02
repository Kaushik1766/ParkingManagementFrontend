import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingHistoryRecord, VehicleTypeEnum } from '../../models/parking-history';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-parking-history',
  imports: [CommonModule, CardModule, TagModule, ChipModule, DividerModule],
  templateUrl: './parking-history.component.html',
  styleUrl: './parking-history.component.scss'
})
export class ParkingHistoryComponent implements OnInit {
  isLoading = false;

  parkingHistory: ParkingHistoryRecord[] = [
    {
      "TicketId": "54e34b3e-4770-4b69-ac00-5279edbe1e18",
      "NumberPlate": "up32kk3333",
      "BuildingId": "c6845bac-0f7a-4957-8fc3-f0364b9d69fa",
      "FLoorNumber": 1,
      "SlotNumber": 12,
      "StartTime": "2025-10-03T00:36:58.766284+05:30",
      "EndTime": "2025-10-03T00:37:09.028022+05:30",
      "VechicleType": 0
    },
    {
      "TicketId": "a8f5c2d1-9876-4321-bc00-1234567890ab",
      "NumberPlate": "df23dfdfdf",
      "BuildingId": "b7856abc-1f8a-4857-9fc3-f1364b8d59ea",
      "FLoorNumber": 2,
      "SlotNumber": 25,
      "StartTime": "2025-10-02T14:20:15.123456+05:30",
      "EndTime": "2025-10-02T18:45:32.654321+05:30",
      "VechicleType": 1
    },
    {
      "TicketId": "b9e6d3f2-8765-4321-cd00-2345678901bc",
      "NumberPlate": "dfg3dfgdd",
      "BuildingId": "c6845bac-0f7a-4957-8fc3-f0364b9d69fa",
      "FLoorNumber": 3,
      "SlotNumber": 8,
      "StartTime": "2025-10-01T09:15:30.987654+05:30",
      "EndTime": "2025-10-01T17:30:45.123789+05:30",
      "VechicleType": 0
    },
    {
      "TicketId": "c1f7e4g3-7654-4321-de00-3456789012cd",
      "NumberPlate": "dd44gg3333",
      "BuildingId": "d7946bcd-2f9b-4968-afc4-f2475c9e6afb",
      "FLoorNumber": 1,
      "SlotNumber": 15,
      "StartTime": "2025-09-30T11:45:22.456789+05:30",
      "EndTime": "2025-09-30T16:20:18.789456+05:30",
      "VechicleType": 1
    }
  ];

  ngOnInit(): void {
    this.loadParkingHistory();
  }

  loadParkingHistory(){
   throw new Error('Method not implemented.');
  }

  getVehicleTypeText(vehicleType: number): string {
    return vehicleType === VehicleTypeEnum.TwoWheeler ? 'Two Wheeler' : 'Four Wheeler';
  }

  getVehicleTypeIcon(vehicleType: number): string {
    return vehicleType === VehicleTypeEnum.TwoWheeler ? 'pi-circle' : 'pi-stop';
  }

  getVehicleTypeSeverity(vehicleType: number): 'info' | 'success' {
    return vehicleType === VehicleTypeEnum.TwoWheeler ? 'info' : 'success';
  }

  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  getBuildingName(buildingId: string): string {
    const buildingNames: { [key: string]: string } = {
      "c6845bac-0f7a-4957-8fc3-f0364b9d69fa": "Main Building",
      "b7856abc-1f8a-4857-9fc3-f1364b8d59ea": "Annex Building",
      "d7946bcd-2f9b-4968-afc4-f2475c9e6afb": "Tower A"
    };
    return buildingNames[buildingId] || "Building";
  }
}
