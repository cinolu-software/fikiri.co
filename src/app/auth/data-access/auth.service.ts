import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignIn } from '../utils/types/sign-in.type';
import { IResetPassword } from '../utils/types/reset-password.type';
import { IForgotPassword } from '../utils/types/forgot-password.type';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { authActions } from '../../shared/store/auth/auth.actions';
import { ISignUp } from '../utils/types/sign-up.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { IUser } from '../../shared/utils/types/models.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #router = inject(Router);
  #store = inject(Store);
  #toast = inject(ToastrService);
  #apiService = inject(APIService);

  signIn(payload: ISignIn, redirectUrl: string): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser | undefined): void => {
      if (!user) return;
      this.#toast.showSuccess(`Bienvenue ${user.name}`);
      this.#store.dispatch(authActions.signIn({ user }));
      this.#router.navigateByUrl(redirectUrl);
    };
    const onError = (error: string): void => {
      this.#toast.showError(error);
      this.#store.dispatch(authActions.signIn({ user: null }));
    };
    return this.#apiService.post('auth/sign-in', payload, onSuccess, onError);
  }

  signUp(payload: ISignUp, link: string): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#toast.showSuccess('Inscription réussie');
      this.#router.navigateByUrl('/sign-in');
    };
    const onError = (error: string) => {
      this.#toast.showError(error);
    };
    const params = buildQueryParams({ link });
    return this.#apiService.post('auth/sign-up', payload, onSuccess, onError, params);
  }

  forgotPassword(payload: IForgotPassword): Observable<IAPIResponse<void>> {
    const onSuccess = () => {
      this.#toast.showSuccess('Lien est envoyé à par e-mail');
      this.#router.navigate(['/reset-password']);
    };
    const onError = (error: string) => {
      this.#toast.showError(error);
    };
    return this.#apiService.post('auth/forgot-password', payload, onSuccess, onError);
  }

  resetPassword(payload: IResetPassword): Observable<IAPIResponse<IUser>> {
    const onSuccess = () => {
      this.#toast.showSuccess('Réinitialisation réussie');
      this.#router.navigate(['/sign-in']);
    };
    const onError = (error: string) => {
      this.#toast.showError(error);
    };
    return this.#apiService.post('auth/reset-password', payload, onSuccess, onError);
  }

  getProfile(): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser | undefined) => {
      if (!user) return;
      this.#store.dispatch(authActions.signIn({ user }));
    };
    return this.#apiService.get('auth/profile', undefined, onSuccess);
  }

  signOut(): Observable<IAPIResponse<void>> {
    const onSuccess = (): void => {
      this.#toast.showSuccess('Déconnexion réussie');
      this.#store.dispatch(authActions.signIn({ user: null }));
      this.#router.navigate(['/sign-in']);
    };
    const onError = (error: string) => {
      this.#toast.showError(error);
    };
    return this.#apiService.post('auth/sign-out', {}, onSuccess, onError);
  }
}
