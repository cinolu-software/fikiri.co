import { ISolution } from '../../../../../../shared/types/models.interfaces';

export interface ISolutionsStore {
  isLoading: boolean;
  solutions: ISolution[];
}
