import { ComponentStore } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUpdatePasswordStore } from '../types/update-password-store.interface';
import { IPasswordPayload } from '../types/password-payload.interface';
import { UpdatePasswordService } from './update-password.service';
import { IValidationError } from '../../../../../../shared/store/auth/types/validation-error.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UpdatePasswordStore extends ComponentStore<IUpdatePasswordStore> {
  vm$: Observable<IUpdatePasswordStore>;

  constructor(private updateInfoService: UpdatePasswordService, private toast: ToastrService) {
    super({ isLoading: false, errors: [] });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isUpdatingImage: boolean) => ({ ...state, isUpdatingImage }));
  setErrors = this.updater((state, errors: IValidationError[]) => ({ ...state, errors }));

  updatePassword = this.effect((payload$: Observable<IPasswordPayload>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.updateInfoService.updatePassword(payload).pipe(
          tapResponse({
            next: () => this.toast.success('Mot de passe mis à jour'),
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') return this.toast.error(message);
              return this.setErrors(message);
            },
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
