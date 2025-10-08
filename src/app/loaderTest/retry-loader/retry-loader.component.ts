import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, of, retry, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-retry-loader',
  imports: [LoaderComponent],
  templateUrl: './retry-loader.component.html',
  styleUrl: './retry-loader.component.scss'
})
export class RetryLoaderComponent {
  isLoading = false

  private httpClient = inject(HttpClient)

  handleClick() {
    console.log('clicked')
    this.isLoading = true
    setTimeout(() => { this.isLoading = false }, 2000)

    this.httpClient.get('test', {
      responseType: 'text'
    }).pipe(
      // mergeMap(val => val != 'connected' ? throwError(() => val) : of(val)),
      map(val => {
        if (val == 'connected') {
          return val;
        } else {
          throw new Error(val)
        }
      }),
      retry({
        count: 6,
        delay: (err) => {
          console.log(err);
          console.log('retrying in 4 second...');
          return timer(4000);
        }
      })
    ).subscribe({
      next: val => {
        console.log(val)
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
