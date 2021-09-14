import { Component, OnInit } from '@angular/core';
//importacion de servicios
import { ClientService } from '../../client.service';
//importacion de clases necesarias para manejar formularios reactivos y el routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //grupo de controles de nuestro formulario
  form!: FormGroup;

  cities: Array<any> = [
    {value: '1', viewValue: 'Armenia'},
    {value: '2', viewValue: 'Montenegro'},
    {value: '3', viewValue: 'Calarca'}
  ];

  //inyeccion de dependencias
  constructor(public client:ClientService, private fb:FormBuilder, private router:Router, public dialog: MatDialog) { }

  //en ngOnInit() metemos todas las instrucciones que queremos que se ejecuten apenas se cree nuestro componente
  ngOnInit(): void {
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "cedula" y "nombre", etc
    //estos controles se encuentran en cada input del formulario formControlName="cedula" y formControlName="password" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  //metodo que se llama para enviar el formulario cuando ocurre el evento (ngSubmit) 
  //que se encuentra referenciado en el form del HTML
  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.postRequestSendForm('http://localhost:10101/register', {
        cedula: this.form.value.cedula,
        nombre: this.form.value.nombre,
        email: this.form.value.email,
        password: this.form.value.password,
        idCiudad: 1
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          //se imprime la respuesta del server
          console.log(response);
         
          this.router.navigate( ['/']);
          const dialogRef = this.dialog.open(LoginComponent);
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        //se imprime el status del error
        console.log(error.status);
      })
    //si ocurrio un error en la validacion del formulario este no se enviara
    //y se imprimira el mensaje "Form error"
    } else {
      console.log("Form error");
    }
  }
}