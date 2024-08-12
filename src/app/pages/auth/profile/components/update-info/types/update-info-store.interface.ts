import { IValidationError } from '../../../../../../shared/store/auth/types/validation-error.interface';

export interface IUpdateInfoStore {
  isLoading: boolean;
  errors: IValidationError[];
}
