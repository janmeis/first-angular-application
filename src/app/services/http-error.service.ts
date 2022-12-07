import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  private erroResponse: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject({ message: ''} as HttpErrorResponse);
  readonly erroResponse$ = this.erroResponse.asObservable();

  addErrorResponse(errorResponse: HttpErrorResponse): void {
    const currentErrorMessage = this.erroResponse.getValue()?.message;
    if (errorResponse?.message != currentErrorMessage)
      this.erroResponse.next(errorResponse);
  }
}
