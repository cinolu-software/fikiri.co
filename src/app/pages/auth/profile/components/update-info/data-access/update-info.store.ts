import { ComponentStore } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateInfoService } from './update-info.service';
import { IUpdateInfoPayload } from '../types/update-info-payload.interface';
import { IUpdateInfoStore } from '../types/update-info-store.interface';
import { authActions } from '../../../../../../shared/store/auth/data-access/auth.actions';
import { selectUser } from '../../../../../../shared/store/auth/data-access/auth.reducers';
import { IValidationError } from '../../../../../../shared/store/auth/types/validation-error.interface';
import { IUser } from '../../../../../../shared/types/models.interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UpdateInfoStore extends ComponentStore<IUpdateInfoStore> {
  vm$: Observable<{ udpateInfoState: IUpdateInfoStore; user: IUser | null }>;

  constructor(private updateInfoService: UpdateInfoService, private store: Store, private toast: ToastrService) {
    super({ isLoading: false, errors: [] });
    this.vm$ = this.select({
      udpateInfoState: this.select((state) => state),
      user: this.store.select(selectUser)
    });
  }
  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setErrors = this.updater((state, errors: IValidationError[]) => ({ ...state, errors }));

  upatedProfile = this.effect((payload$: Observable<IUpdateInfoPayload>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.updateInfoService.updateProfile(payload).pipe(
          tapResponse({
            next: (user) => {
              this.toast.success('Informations mises à jour');
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.toast.error(message);
              return this.setErrors(error.error.message);
            },
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
