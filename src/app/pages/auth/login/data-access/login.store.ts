import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { LoginStoreInterface } from '../types/login-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { LoginPayloadInterface } from '../types/login-payload.interface';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { authActions } from '../../../../shared/store/auth/data-access/auth.actions';
import { AppStoreInterface } from '../../../../shared/types/app-store.interface';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../../shared/types/models.interfaces';

@Injectable()
export class LoginStore extends ComponentStore<LoginStoreInterface> {
  vm$: Observable<LoginStoreInterface> = this.select((state) => state);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppStoreInterface>,
    private toast: ToastrService
  ) {
    super({ isLoading: false, error: null });
  }

  setLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));

  onLoginSuccess(user: IUser) {
    this.router.navigateByUrl('/auth/profile');
    this.store.dispatch(authActions.authenticateUser({ user }));
    this.toast.success('Connexion réussie');
  }

  readonly login = this.effect((payload$: Observable<LoginPayloadInterface>) => {
    return payload$.pipe(
      tap(() => this.setLoading(true)),
      exhaustMap((payload: LoginPayloadInterface) =>
        this.loginService.login(payload).pipe(
          tapResponse({
            next: (user: IUser) => this.onLoginSuccess(user),
            error: (error: HttpErrorResponse) => this.toast.error(error.error.message),
            finalize: () => this.setLoading(false)
          })
        )
      )
    );
  });
}
