import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';
import { empresa } from '@app/models/admin-abm';
import { central } from '@app/models/admin-abm';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url="http://localhost:3000/usuarios";

  constructor(private http:HttpClient){}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
