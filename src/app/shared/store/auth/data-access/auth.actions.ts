import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../../types/models.interfaces';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    authentication: emptyProps(),
    authenticateUser: props<{ user: IUser | null }>(),
    logout: emptyProps()
  }
});
