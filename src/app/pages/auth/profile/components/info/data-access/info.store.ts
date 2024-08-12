import { ComponentStore } from '@ngrx/component-store';
import { IUserInfoStore } from '../types/info-store.interface';
import { Observable, exhaustMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoService } from './info.service';
import { Injectable } from '@angular/core';
import { authActions } from '../../../../../../shared/store/auth/data-access/auth.actions';
import { selectUser } from '../../../../../../shared/store/auth/data-access/auth.reducers';
import { IUser } from '../../../../../../shared/types/models.interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InfoStore extends ComponentStore<IUserInfoStore> {
  userInfoState$: Observable<IUserInfoStore>;
  vm$: Observable<{ userInfoState: IUserInfoStore; user: IUser | null }>;

  constructor(private userInfoService: InfoService, private store: Store, private toast: ToastrService) {
    super({ isLoading: false });
    this.userInfoState$ = this.select((state) => state);
    this.vm$ = this.select({
      userInfoState: this.userInfoState$,
      user: this.store.select(selectUser)
    });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));

  updateImage = this.effect((payload: Observable<{ file: FormData; userId: number }>) =>
    payload.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap((payload) =>
        this.userInfoService.updateImage(payload.userId, payload.file).pipe(
          tapResponse({
            next: (user) => {
              this.toast.success("L'image a été mise à jour avec succès");
              this.store.dispatch(authActions.authenticateUser({ user }));
            },
            error: (err: HttpErrorResponse) => this.toast.error(err.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
