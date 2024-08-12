import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../../../../shared/types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  constructor(private http: HttpClient) {}

  updateImage(userId: number | undefined, file: FormData): Observable<IUser> {
    return this.http.post<{ data: IUser }>(`users/image/${userId}`, file).pipe(map((res) => res.data));
  }
}
