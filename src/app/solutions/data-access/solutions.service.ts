import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParams } from '../types/query-params.type';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { ISolution, ICall } from '../../shared/utils/types/models.type';

@Injectable()
export class SolutionsService {
  #apiService = inject(APIService);

  getSolution(id: string): Observable<IAPIResponse<ISolution>> {
    return this.#apiService.get(`solutions/${id}`);
  }

  getSolutions(queryParams: QueryParams): Observable<IAPIResponse<[ISolution[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('solutions/mapped', params);
  }

  getWinningSolutions(): Observable<IAPIResponse<ISolution[]>> {
    return this.#apiService.get('solutions/find-awards');
  }

  getEvents(): Observable<IAPIResponse<ICall[]>> {
    return this.#apiService.get('calls');
  }
}
