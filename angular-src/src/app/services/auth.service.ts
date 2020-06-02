import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";


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

interface ProfileResponse {
  user: any;
}

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    // returns RegisterResponse
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<RegisterResponse>( 'http:///localhost:3000/users/register', user, { headers });
  }

  authenticateUser(user) {
    // returns AuthResponse
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<AuthResponse>( 'http:///localhost:3000/users/authenticate', user, { headers });
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    // returns AuthResponse
    return this.http.get<ProfileResponse>( 'http:///localhost:3000/users/profile', { headers });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    //Checks if the users token is not expired
    this.loadToken;
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.authToken);
  }

}

