import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISolution } from '../../../../../../shared/types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  constructor(private http: HttpClient) {}

  getSolutions(): Observable<ISolution[]> {
    return this.http.get<{ data: ISolution[] }>('solutions/user').pipe(map((res) => res.data));
  }

  getSolution(id: number): Observable<ISolution> {
    return this.http.get<{ data: ISolution }>(`solutions/${id}`).pipe(map((res) => res.data));
  }
}
