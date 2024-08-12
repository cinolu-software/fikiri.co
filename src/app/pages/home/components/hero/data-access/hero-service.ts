import { Injectable } from '@angular/core';
import { TotalsInterface } from '../types/totals.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient) {}

  getCount(): Observable<TotalsInterface> {
    return this.http.get<{ data: TotalsInterface }>('dashboard').pipe(map((res) => res.data));
  }
}
