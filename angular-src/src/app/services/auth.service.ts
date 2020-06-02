import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface RegisterResponse {
  success: boolean;
  msg: string;
}

interface AuthResponse {
  success: boolean;
  msg: string;
  token: string;
  user: any;
}

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    // returns RegisterResponse
    return this.http.post<RegisterResponse>( 'http:///localhost:3000/users/register', user);
  }

  authenticateUser(user) {
    // returns AuthResponse
    return this.http.post<AuthResponse>( 'http:///localhost:3000/users/authenticate', user);
  }

  getProfile() {

  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
