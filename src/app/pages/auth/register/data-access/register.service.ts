import { Injectable } from '@angular/core';
import { RegisterPayloadInterface } from '../types/register-payload.interface';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../../shared/types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(payload: RegisterPayloadInterface): Observable<IUser> {
    return this.http.post<{ data: IUser }>('auth/register', payload).pipe(map((res) => res.data));
  }
}
