import { Component, OnInit, Input } from '@angular/core';
//importacion de servicios
import { ClientService } from '../../client.service';
//importacion de clases necesarias para manejar formularios reactivos y el routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.css']
})
export class FormReportComponent implements OnInit {
  //grupo de controles de nuestro formulario
  form!: FormGroup;

  @Input() title:any;
  
  //inyeccion de dependencias
  constructor(public client:ClientService, private fb:FormBuilder, private router:Router) { }
  
  //en ngOnInit() metemos todas las instrucciones que queremos que se ejecuten apenas se cree nuestro componente
  ngOnInit(): void {
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "numdocumento" y "nombrecompleto", etc
    //estos controles se encuentran en cada input del formulario formControlName="numdocumento" y formControlName="nombrecompleto" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      numDocument: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  //metodo que se llama para enviar el formulario cuando ocurre el evento (ngSubmit) 
  //que se encuentra referenciado en el form del HTML
  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.postRequestSendForm('http://localhost:10101/registerLostDocuments', {
        numDocumento: this.form.value.numDocument,
        nombreCompleto: this.form.value.fullname,
        email: this.form.value.email,
        descripcion: this.form.value.description,
        fecha: this.form.value.date,
        estado : 1,
        perdido: 1,
        cedulaFuncionario: "12345",
        idCiudad: 1
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          //se imprime la respuesta del server
          console.log(response);          
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