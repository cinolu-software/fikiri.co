import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HeroStoreInterfce } from '../types/hero-store.interfce';
import { exhaustMap, Observable, tap } from 'rxjs';
import { TotalsInterface } from '../types/totals.interface';
import { HeroService } from './hero-service';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';

@Injectable()
export class HeroStore extends ComponentStore<HeroStoreInterfce> {
  vm$: Observable<HeroStoreInterfce>;

  constructor(private heroService: HeroService) {
    super({ isLoading: true, totals: null, error: null });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setTotals = this.updater((state, totals: TotalsInterface) => ({ ...state, totals }));
  setError = this.updater((state, error: string) => ({ ...state, error }));

  getTotals = this.effect<void>((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.heroService.getCount().pipe(
          tapResponse({
            next: (totals) => this.setTotals(totals),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
