import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEvent } from '../../../../../shared/types/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class eventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEvent[]> {
    return this.http.get<{ data: IEvent[] }>('events').pipe(map((res) => res.data));
  }
}
