import { ISolution } from '../../../../../shared/types/models.interfaces';

export interface WinningSolutionsStoreInterface {
  isLoading: boolean;
  solutions: ISolution[];
  error: string | null;
}
