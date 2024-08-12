import { Injectable } from '@angular/core';
import { ResetPasswordRequestPayloadInterface } from '../types/reset-password-request-payload.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordRequestService {
  constructor(private http: HttpClient) {}

  resetPasswordRequest(payload: ResetPasswordRequestPayloadInterface): Observable<null> {
    return this.http.post<{ data: null }>('auth/reset-password-request', payload).pipe(map((res) => res.data));
  }
}
