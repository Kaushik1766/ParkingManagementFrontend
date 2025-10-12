import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingHistory, VehicleTypeEnum } from '../../models/parking-history';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { HistoryCardComponent } from './history-card/history-card.component';
import { ParkingHistoryService } from '../services/parking-history.service';
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMON_MESSAGES } from '../../../config/common';
import { PARKING_HISTORY_MESSAGES } from '../../../config/parking-history';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";
import { FloatLabel } from "primeng/floatlabel";

@Component({
  selector: 'app-parking-history',
  imports: [
    FormsModule,

    Toast,
    InputTextModule,
    FloatLabel,

    HistoryCardComponent,
    LoaderComponent
  ],
  templateUrl: './parking-history.component.html',
  styleUrl: './parking-history.component.scss',
  providers:[MessageService]
})
export class ParkingHistoryComponent implements OnInit {
  isLoading = false;

  parkingHistory: ParkingHistory[] = [];
  numberplateFilter = '';

  private parkingHistoryService = inject(ParkingHistoryService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadParkingHistory();
  }

  private loadParkingHistory() {
    this.isLoading = true;
    this.parkingHistoryService.getParkingHistory().subscribe({
      next: (history) => {
        this.parkingHistory = history;
        this.isLoading = false;
      },
      error: (error:HttpErrorResponse) => {
  this.messageService.add({severity:'error', summary: COMMON_MESSAGES.TOAST.ERROR_SUMMARY, detail: error.error.message || PARKING_HISTORY_MESSAGES.ERRORS.FETCH_FAILED});
        this.isLoading = false;
      }
    });
  }

  get filteredHistory(): ParkingHistory[] {
    return this.parkingHistory.filter(h=>h.NumberPlate.includes(this.numberplateFilter));
  }

}
