import { ISolution } from '../../../shared/types/models.interfaces';

export interface SolutionResponseInterface {
  solution: ISolution | null;
  prev: number | null;
  next: number | null;
}
