import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ){}

  //Se estiver autenticado
  canActivate(): boolean  {


    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
    
  }
  
}
