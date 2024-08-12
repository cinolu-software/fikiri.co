import { Injectable } from '@angular/core';
import { ResetPasswordPayloadInterface } from '../types/reset-password-payload.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  resetPassword(payload: ResetPasswordPayloadInterface): Observable<null> {
    return this.http.post<{ data: null }>('auth/reset-password', payload).pipe(map((res) => res.data));
  }
}
