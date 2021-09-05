import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
//importacion de servicios
import { ClientService } from '../../client.service';
//importacion de clases necesarias para manejar formularios reactivos y el routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //grupo de controles de nuestro formulario
  form!: FormGroup;

  //inyeccion de dependencias
  constructor(public client:ClientService, private fb:FormBuilder, private router: Router, public dialogRef: MatDialogRef<LoginComponent>) { }

  //en ngOnInit() metemos todas las instrucciones que queremos que se ejecuten apenas se cree nuestro componente
  ngOnInit(): void {
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "cedula" y "nombre", etc
    //estos controles se encuentran en cada input del formulario formControlName="cedula" y formControlName="password" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      cedula: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  showRegister(){
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }

  //metodo que se llama para enviar el formulario cuando ocurre el evento (ngSubmit) 
  //que se encuentra referenciado en el form del HTML
  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.postRequestLogin('http://localhost:10101/login', {
        cedula: this.form.value.cedula,
        password: this.form.value.password
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          //se imprime la respuesta del server
          console.log(response);
          /* //se guarda el valor de la propiedad email en el almacenamiento local persistente
          localStorage.setItem('email', response.email)
          //se guarda el valor de la propiedad password en el almacenamiento local por sesión
          //estos datos se borran tan pronto el usuario cierra la ventana
          sessionStorage.setItem('pass', response.password)
          //recuperamos el valor de la porpiedad email guardada anteriormete y la imprimimos
          console.log(localStorage.getItem('email'));
          //dirigimos al usuario a la ruta /ayuda
          //this.route.navigate( ['/ayuda']); */
          this.router.navigate( ['/']);
          this.dialogRef.close();
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
