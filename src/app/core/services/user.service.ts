import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    getAllUsers() {
      return this.http.get<any>(`/users`);
  }


    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
}
