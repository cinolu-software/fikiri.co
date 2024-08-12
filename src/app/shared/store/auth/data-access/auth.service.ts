import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(): Observable<IUser> {
    return this.http.get<{ data: IUser }>('auth/profile').pipe(map((response) => response.data));
  }

  logout(): Observable<null> {
    return this.http.post('auth/logout', {}).pipe(map(() => null));
  }
}
