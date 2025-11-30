import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BillingService } from '../services/billing.service';
import { Bill } from '../../models/bill';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-billing',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        ButtonModule,
        CardModule,
        TableModule,
        ToastModule,
        LoaderComponent
    ],
    templateUrl: './billing.component.html',
    styleUrl: './billing.component.scss',
    providers: [MessageService]
})
export class BillingComponent implements OnInit {
    months = [
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        { label: 'March', value: 3 },
        { label: 'April', value: 4 },
        { label: 'May', value: 5 },
        { label: 'June', value: 6 },
        { label: 'July', value: 7 },
        { label: 'August', value: 8 },
        { label: 'September', value: 9 },
        { label: 'October', value: 10 },
        { label: 'November', value: 11 },
        { label: 'December', value: 12 }
    ];

    years: { label: string, value: number }[] = [];

    selectedMonth: number;
    selectedYear: number;

    bill: Bill | null = null;
    isLoading = false;

    private billingService = inject(BillingService);
    private messageService = inject(MessageService);

    constructor() {
        const currentDate = new Date();
        this.selectedMonth = currentDate.getMonth() + 1;
        this.selectedYear = currentDate.getFullYear();

        for (let year = 2020; year <= this.selectedYear + 1; year++) {
            this.years.push({ label: year.toString(), value: year });
        }
    }

    ngOnInit(): void {
        this.getBill();
    }

    getBill() {
        this.isLoading = true;
        this.bill = null;
        this.billingService.getBill(this.selectedMonth, this.selectedYear).subscribe({
            next: (data) => {
                this.bill = data;
                this.isLoading = false;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'Failed to fetch bill' });
                this.isLoading = false;
            }
        });
    }
}
