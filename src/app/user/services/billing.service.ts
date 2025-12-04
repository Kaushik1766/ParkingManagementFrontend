import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Bill } from '../../models/bill';

@Injectable({
    providedIn: 'root'
})
export class BillingService {
    private httpClient = inject(HttpClient)

    getBill(month: number, year: number) {
        return this.httpClient.get<Bill>(`billing`, {
            params: {
                month: month.toString(),
                year: year.toString()
            }
        });
    }
}
