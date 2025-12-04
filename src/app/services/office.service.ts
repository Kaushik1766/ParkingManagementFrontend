import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { Office } from '../models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private httpClient = inject(HttpClient)

  constructor() { }

  getOffices() {
    return this.httpClient.get<Office[]>('offices')
  }
}
