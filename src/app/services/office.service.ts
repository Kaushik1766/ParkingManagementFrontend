import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private httpClient = inject(HttpClient)

  constructor() { }

  getOffices() {
    return this.httpClient.get<string[]>('offices')
  }
}
