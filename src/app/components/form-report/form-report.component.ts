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

  @Input() title: any;

  //inyeccion de dependencias
  constructor(private client: ClientService, private fb: FormBuilder, private router: Router) { }

  //en ngOnInit() metemos todas las instrucciones que queremos que se ejecuten apenas se cree nuestro componente
  ngOnInit(): void {
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "numdocumento" y "nombrecompleto", etc
    //estos controles se encuentran en cada input del formulario formControlName="numdocumento" y formControlName="nombrecompleto" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      description: ['', Validators.maxLength(1000)]
    });
  }

  //metodo que se llama para enviar el formulario cuando ocurre el evento (ngSubmit) 
  //que se encuentra referenciado en el form del HTML
  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      let category: number = 1;
      if (this.title === 'Reportar documentos encontrados') {
        category = 0;
      }
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.postRequestSendForm('http://localhost:10101/addDocuments', {
        documentNumber: this.form.value.documentNumber,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        description: this.form.value.description,
        date: this.form.value.date,
        state: 1,
        category: category,
        //identificationNumber: "12345",
        cityCode: "63001"
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