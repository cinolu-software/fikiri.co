import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IPasswordPayload } from '../types/password-payload.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  constructor(private http: HttpClient) {}

  updatePassword(payload: IPasswordPayload): Observable<null> {
    return this.http.patch<{ data: null }>('auth/update-password', payload).pipe(map((res) => res.data));
  }
}
