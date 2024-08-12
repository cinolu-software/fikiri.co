import { SolutionResponseInterface } from './solution-response.interface';

export interface SolutionStoreInterface {
  isLoading: boolean;
  solutionResponse: SolutionResponseInterface | null;
  error: string | null;
}
