import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    public loginService: LoginService,
    public toastr: ToastrService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const jwt = currentUser ? currentUser.token : "";

      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${jwt}`),
      });

      return next.handle(authReq).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.toastr.error(
                "Sessão expirada, faça login novamente",
                "Erro"
              );
              this.loginService.logout();
            }
            if (err.status === 403) {
              this.toastr.error(
                "Você não tem permissão para acessar este recurso",
                "Erro"
              );
            }
          }
          return throwError(() => new Error("Erro"));
        })
      );
    }
}
