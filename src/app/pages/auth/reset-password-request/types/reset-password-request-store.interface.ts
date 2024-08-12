import { IValidationError } from '../../../../shared/store/auth/types/validation-error.interface';

export interface ResetPasswordRequestStoreInterface {
  isLoading: boolean;
  error: string | null;
  validationErrors: IValidationError[];
}
