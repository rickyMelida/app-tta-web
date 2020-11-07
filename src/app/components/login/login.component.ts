import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Array<any> =
    [
      {
        user: 'Admin',
        password: '000000'
      }
    ];


  dataForm: any = {
    user: '',
    password: ''
  };
  constructor(private ruta: Router) { }
  ngOnInit() {
  }

  login(datos) {
  }

  onsubmit() {
    if (this.dataForm.user === this.usuarios[0].user && this.dataForm.password === this.usuarios[0].password) {
      const user = this.dataForm.user;
      // alert('Excelente');
      this.ruta.navigate(['/main']);
    } else {
      Swal.fire(
        'Ups!',
        'Usuario o Contraseña incorrecta!',
        'warning'
      );
    }

  }

}
