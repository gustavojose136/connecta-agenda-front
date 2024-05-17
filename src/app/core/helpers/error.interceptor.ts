import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private loginService: LoginService,
      public toastr: ToastrService,
      private router: Router,
      ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                if(err.error?.message === 'Usuário não encontrado na base'){
                  this.toastr.error('Usuário não encontrado!', "Erro!");
                  return;
                }

                if(err.error?.message === 'Usuário ou senha inválidos.'){
                  this.toastr.error("Usuário ou senha inválidos. Por favor, tente novamente.", "Erro!");
                  return;
                }

                this.toastr.error('Sessão expirada!', 'Erro!');
                this.loginService.logout();
            }

            if(err.status === 500){
              if (err.error){
                this.toastr.error(err.error, "Erro!");

                if(err.error === "Este Usuário não é um externo"){
                  this.loginService.logout();
                  this.router.navigate(['/inicio/colaborador']);
                }
              }

            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
