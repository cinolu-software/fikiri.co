import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SolutionResponseInterface } from '../types/solution-response.interface';
import { HttpClient } from '@angular/common/http';
import { ISolution } from '../../../shared/types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  getSolution(id: number): Observable<SolutionResponseInterface> {
    return this.http.get<{ data: SolutionResponseInterface }>(`solutions/${id}`).pipe(map((res) => res.data));
  }

  uploadImage(solutionId: number | undefined, file: FormData): Observable<ISolution> {
    return this.http.post<{ data: ISolution }>(`solutions/image/${solutionId}`, file).pipe(map((res) => res.data));
  }

  deleteImage(solutionId: number, imageId: number): Observable<ISolution> {
    return this.http
      .delete<{ data: ISolution }>(`solutions/${solutionId}/image/${imageId}`)
      .pipe(map((res) => res.data));
  }
}
