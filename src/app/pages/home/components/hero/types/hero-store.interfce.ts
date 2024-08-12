import { TotalsInterface } from './totals.interface';

export interface HeroStoreInterfce {
  isLoading: boolean;
  totals: TotalsInterface | null;
  error: string | null;
}
