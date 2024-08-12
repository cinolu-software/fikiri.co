import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { SolutionStoreInterface } from '../types/solution-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { SolutionResponseInterface } from '../types/solution-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SolutionService } from './solution.service';
import { Store } from '@ngrx/store';
import { IUser } from '../../../shared/types/models.interfaces';
import { selectUser } from '../../../shared/store/auth/data-access/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class SolutionStore extends ComponentStore<SolutionStoreInterface> {
  vm$: Observable<{ solutionStore: SolutionStoreInterface; user: IUser | null }>;

  constructor(private solutionService: SolutionService, private store: Store) {
    super({ isLoading: false, solutionResponse: null, error: null });
    this.vm$ = this.select({
      solutionStore: this.state$,
      user: this.store.select(selectUser)
    });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string) => ({ ...state, error }));
  setSolutionResponse = this.updater((state, solutionResponse: SolutionResponseInterface | null) => ({
    ...state,
    solutionResponse
  }));

  getSolution = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((id) =>
        this.solutionService.getSolution(id).pipe(
          tapResponse({
            next: (solutionResponse) => this.setSolutionResponse(solutionResponse),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      ),
      tap(() => this.setIsLoading(false))
    )
  );

  uploadImage = this.effect((payload: Observable<{ file: FormData; solutionId: number }>) =>
    payload.pipe(
      exhaustMap((payload) =>
        this.solutionService.uploadImage(payload.solutionId, payload.file).pipe(
          tapResponse({
            next: (solution) => this.getSolution(solution.id),
            error: () => this.setIsLoading(false),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );

  deleteImage = this.effect((payload: Observable<{ solutionId: number; imageId: number }>) =>
    payload.pipe(
      exhaustMap((payload) =>
        this.solutionService.deleteImage(payload.solutionId, payload.imageId).pipe(
          tapResponse({
            next: (solution) => this.getSolution(solution.id),
            error: () => this.setIsLoading(false),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
