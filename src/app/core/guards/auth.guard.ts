import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public toastr: ToastrService,
    private loginService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      if (currentUser.message != undefined) {
        this.loginService.logout();
        location.reload();
        this.router.navigate(["/"]);
        return false;
      }

      // console.log(currentUser);
      const jwt = currentUser.token;
      if (jwt) {
        // const decodedToken = jwt.verify(jwt, environment.apiKey);
        // console.log(decodedToken);


        // console.log(jwt);
        const tokenPayload: JwtPayload = jwtDecode(jwt);
        // console.log(tokenPayload);

        //verifica se o token está expirado
        const expired = tokenPayload.exp < Date.now() / 1000;
        if (expired) {
          this.toastr.error("Sessão expirada");
          this.loginService.logout();
          location.reload();
          this.router.navigate(["/account/auth/login"]);
          return false;
        }

        return true;
      }
    }

    // Usuário não está autenticado, redirecione para a página de login
    this.router.navigate(["/account/auth/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
