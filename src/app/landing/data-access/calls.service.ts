import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICall } from '../../shared/utils/types/models.type';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { QueryParams } from '../utils/types/query-params.type';

@Injectable()
export class CallsService {
  #apiService = inject(APIService);

  getPublished(queryParams: QueryParams): Observable<IAPIResponse<[ICall[], number]>> {
    const params = buildQueryParams(queryParams as unknown as Record<string, string>);
    return this.#apiService.get('calls/find-published', params);
  }
}
