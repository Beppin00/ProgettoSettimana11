import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthData } from '../services/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  user: AuthData | undefined;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // togliere punto esclamativo
    this.user = JSON.parse(localStorage.getItem('user')!);
    if (!this.user) return next.handle(request);
    // cercare di implementare subjest
    const newreq = request.clone({
        headers: request.headers.set(
          "Authorization",
          `Bearer ${this.user.accessToken}`
        )
    })
    return next.handle(newreq);
  }
}
