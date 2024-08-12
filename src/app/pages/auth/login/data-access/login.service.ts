import { Injectable } from '@angular/core';
import { LoginPayloadInterface } from '../types/login-payload.interface';
import { map, Observable } from 'rxjs';
import { IUser } from '../../../../shared/types/models.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(payload: LoginPayloadInterface): Observable<IUser> {
    return this.http.post<{ data: IUser }>('auth/login', payload).pipe(map((res) => res.data));
  }
}
