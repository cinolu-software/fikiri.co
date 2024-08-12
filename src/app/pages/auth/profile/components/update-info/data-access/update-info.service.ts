import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUpdateInfoPayload } from '../types/update-info-payload.interface';
import { IUser } from '../../../../../../shared/types/models.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateInfoService {
  constructor(private http: HttpClient) {}

  updateProfile(payload: IUpdateInfoPayload): Observable<IUser> {
    return this.http.patch<{ data: IUser }>('auth/profile', payload).pipe(map((res) => res.data));
  }
}
