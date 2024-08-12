import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISolution } from '../../../../../shared/types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WinningSolutionsService {
  constructor(private http: HttpClient) {}

  getWinningSolutions(): Observable<ISolution[]> {
    return this.http.get<{ data: ISolution[] }>('solutions/winning-solutions').pipe(map((res) => res.data));
  }
}
