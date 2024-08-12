import { IEvent } from '../../../../../shared/types/models.interfaces';

export interface EventsStoreInterface {
  isLoading: boolean;
  events: IEvent[];
  error: string | null;
}
