import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyB3y97qDM7fUR8k1hK7RFvMLL7bEBF-2-Q';


  //Criar novo usuario
 //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

 //login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  
  
  constructor(private http: HttpClient) { }
  

  logout() {
    

  }
  
  login(user: UserModel) {
    
  }
  

  newUser(user: UserModel) {

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apiKey}`,
      authData
    );

  }
}
