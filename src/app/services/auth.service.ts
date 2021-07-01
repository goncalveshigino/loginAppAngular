import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyB3y97qDM7fUR8k1hK7RFvMLL7bEBF-2-Q';

  userToken: string;

    
  constructor(private http: HttpClient) {
     this.readToken();
   }
  
//Destruir o token
  logout() {
    localStorage.removeItem('token');
  }

  
  login(user: UserModel) {

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );

    
  }
  

  newUser(user: UserModel) {

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );

  }
  

  private saveToken(idToken: string) {
     
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    
  }
  
  //lerToken
  readToken() {
    
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }
    
    return this.userToken;
  }

  isAuthenticated(): boolean {

    return this.userToken.length > 2;
  }

}
