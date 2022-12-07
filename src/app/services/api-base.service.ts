import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorService } from './http-error.service';

@Injectable()
export abstract class ApiBaseService {

  constructor(
    private http: HttpClient,
    private httpError: HttpErrorService
  ) { }

  protected get$<T>(url: string, args: any = null): Observable<T> {
    return this.http.get<T>(this.getUrl(url, args), this.getOptions()).pipe(
      catchError((err, caught) => {
        this.httpError.addErrorResponse(err);
        return caught;
      })
    );
  }

  protected getUrl(url: string, args: any): string {
    let resUrl = `/api/${url}`;
    resUrl = (resUrl).replace('//', '/');  // just in case
    if (args) {
      const queryArgs = Object.keys(args).map(k => `${k}=${args[k]}`);
      return `${resUrl}?${queryArgs.join('&')}`;
    }

    return resUrl;
  }

  protected getOptions(): { headers: { [header: string]: string } } {
    const options = { headers: { 'Content-type': 'application/json; charset=UTF-8' } };
    return options;
  }
}
