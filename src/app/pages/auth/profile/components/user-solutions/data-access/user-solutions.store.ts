import { ComponentStore } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { tapResponse } from '@ngrx/operators';
import { Injectable } from '@angular/core';
import { ISolution } from '../../../../../../shared/types/models.interfaces';
import { ToastrService } from 'ngx-toastr';
import { ISolutionsStore } from '../types/user-solutions-store.type';
import { SolutionsService } from './user-solutions.service';

@Injectable()
export class SolutionsStore extends ComponentStore<ISolutionsStore> {
  vm$: Observable<ISolutionsStore>;

  constructor(private userSolutionsService: SolutionsService, private store: Store, private toast: ToastrService) {
    super({ isLoading: false, solutions: [] });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setSolutions = this.updater((state, solutions: ISolution[]) => ({ ...state, solutions }));

  getSolutions = this.effect<void>((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.userSolutionsService.getSolutions().pipe(
          tapResponse({
            next: (solutions) => this.setSolutions(solutions),
            error: () => this.setIsLoading(false),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
