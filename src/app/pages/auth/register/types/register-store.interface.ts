import { IValidationError } from '../../../../shared/store/auth/types/validation-error.interface';

export interface RegisterStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: IValidationError[];
}
