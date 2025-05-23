import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication, ICall } from '../../shared/utils/types/models.type';
import { QueryParams } from '../utils/query-params.type';
import { Router } from '@angular/router';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';

@Injectable()
export class CallsService {
  #apiService = inject(APIService);
  #toast = inject(ToastrService);
  #router = inject(Router);

  getLatest(): Observable<IAPIResponse<ICall[]>> {
    return this.#apiService.get('calls/find-latest');
  }

  getOne(id: string): Observable<IAPIResponse<ICall>> {
    return this.#apiService.get(`calls/${id}`);
  }

  getPublished(queryParams: QueryParams): Observable<IAPIResponse<[ICall[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('calls/find-published', params);
  }

  apply(call: string | undefined, responses: JSON): Observable<IAPIResponse<IApplication>> {
    const onSuccess = async () => {
      this.#toast.showSuccess('Candidature soumise');
      this.#router.navigate(['/calls']);
    };
    const onError = async (error: string) => {
      this.#toast.showError(error);
    };
    return this.#apiService.post('solutions', { call, responses }, onSuccess, onError);
  }
}
