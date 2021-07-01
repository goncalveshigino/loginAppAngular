import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;


  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new UserModel();
  }
  
   
  registro( form: NgForm ) {
    
    if (form.invalid) { return; } 

    Swal.fire({
      allowOutsideClick: false,
      title: 'Relaxa',
      text: 'Guardando a informacao',
      type: 'info',
    });

    Swal.showLoading();

    this.auth.newUser(this.user)
      .subscribe(resp => {

        console.log(resp);
       
        Swal.fire({
          allowOutsideClick: false,
          title: this.user.name,
          text: 'Cadastrado com sucesso',
          type: 'success',
          timer: 2000
        });

        // this.router.navigateByUrl('/login')
    
       
      }, (err) => {
          
          console.log(err.error.error.message); 

          Swal.fire({
            allowOutsideClick: false,
            type: 'error',
            title: 'Ja tem uma conta',
            text: err.error.error.message,
            timer: 2000
          })

      });
  }

}
