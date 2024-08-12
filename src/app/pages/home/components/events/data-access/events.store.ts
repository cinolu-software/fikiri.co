import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EventsStoreInterface } from '../types/events-store.interface';
import { eventsService } from './events.service';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { IEvent } from '../../../../../shared/types/models.interfaces';

@Injectable()
export class eventsStore extends ComponentStore<EventsStoreInterface> {
  vm$: Observable<EventsStoreInterface>;

  constructor(private callsService: eventsService) {
    super({ isLoading: false, events: [], error: null });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setEvents = this.updater((state, events: IEvent[]) => ({ ...state, events }));
  setError = this.updater((state, error: string | null) => ({ ...state, error }));

  getEvents = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.callsService.getEvents().pipe(
          tapResponse({
            next: (events) => this.setEvents(events),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    );
  });
}
