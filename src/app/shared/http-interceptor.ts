import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService) {
  }

  static pendingRequests = 0;
  static loadingMessageRef: NzMessageRef;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let options = {};

    const token = this.authService.getToken();
    if (token != null) {
      options = { headers: req.headers.set('Authorization', token) };
    }

    if (AppHttpInterceptor.pendingRequests === 0) {
      AppHttpInterceptor.loadingMessageRef = this.message.loading('Processando, por favor aguarde..', { nzDuration: 15 * 1000 });
    }

    AppHttpInterceptor.pendingRequests++;

    return next.handle(req.clone(options))
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            AppHttpInterceptor.pendingRequests--;

            if (AppHttpInterceptor.pendingRequests === 0 && AppHttpInterceptor.loadingMessageRef) {
              this.message.remove(AppHttpInterceptor.loadingMessageRef.messageId);
            }
          }
        }),
        catchError((error: HttpErrorResponse) => {
          AppHttpInterceptor.pendingRequests--;

          if (AppHttpInterceptor.pendingRequests === 0 && AppHttpInterceptor.loadingMessageRef) {
            this.message.remove(AppHttpInterceptor.loadingMessageRef.messageId);
          }

          if (error.status === 401) {
            this.router.navigate(['/auth']);
          }
          else {
            this.message.create('error', 'Ocorreu um erro ao executar a operação');
          }

          return throwError(() => error);
        })
      );
  }
}
