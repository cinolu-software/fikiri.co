import { IValidationError } from '../../../../../../shared/store/auth/types/validation-error.interface';

export interface IUpdatePasswordStore {
  isLoading: boolean;
  errors: IValidationError[];
}
