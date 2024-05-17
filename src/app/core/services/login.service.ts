import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { User } from "../models/auth.models";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    return this.http
      .post<any>(environment.apiAddress + `Login`, user)
      .pipe(
        map((user) => {
          if (user && user.token) {
            console.log(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("selectedAreas");
    this.currentUserSubject.next(null);
    this.router.navigate([""]);
  }
}
