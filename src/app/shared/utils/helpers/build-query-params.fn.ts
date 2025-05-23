import { HttpParams } from '@angular/common/http';

export const buildQueryParams = (queryParams: Record<string, any>): HttpParams | undefined => {
  let params = new HttpParams();
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];
    if (value == null || value === '') return;
    params = params.set(key, value);
  });
  return params;
};
