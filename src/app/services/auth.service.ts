import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';


export interface AuthData {
  accessToken: string,
  user : {
      id: number,
      email: string,
  }
}
export interface SignupData {
  name: string,
  email: string,
  password: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject  = new BehaviorSubject<null | AuthData>(null);
  user! : {id: number, email: string };



  path: string = 'http://localhost:4201/api'
  constructor(private http: HttpClient) { }

  signUp(user: {email: string, password:string, name: string}){
    return this.http.post<AuthData>(`${this.path}/users`, user);
  }


  signIn(user: {email: string, password: string}){
    return this.http.post<AuthData>(`${this.path}/login`, user).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data))
      this.user = data.user;
    }));
  }
}
