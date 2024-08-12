import { IEvent, ISolution, IThematic } from '../../../shared/types/models.interfaces';
import { SearchResponseInterface } from './search-response.interface';

export interface SolutionsStoreInterface {
  isLoading: boolean;
  isFiltering: boolean;
  count: number;
  solutions: ISolution[];
  searchResults: SearchResponseInterface | null;
  events: IEvent[];
  thematics: IThematic[];
  error: string | null;
}
