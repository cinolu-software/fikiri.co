import { IUser } from '../../../types/models.interfaces';

export interface AuthStoreInterface {
  user: IUser | null;
}
