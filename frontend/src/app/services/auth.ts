import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url="https://reqres.in/api/users";

  constructor(private http:HttpClient){}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
