import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  
  spinner: boolean = false;
  form!: FormGroup;
  cities!: Array<any>;
  inputFormControl = new FormControl({ value: 12345, disabled: false });
  fullName!:string;
  constructor(private client: ClientService, private fb: FormBuilder, private router: Router) { }

  
  ngOnInit(): void {
    
    //this.inputFormControl.enable();
    //this.inputFormControl.setValue(1234);
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "cedula" y "nombre", etc
    //estos controles se encuentran en cada input del formulario formControlName="cedula" y formControlName="password" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      fullName: ['123', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      cityCode: [''],
      //cityCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
    });

    this.showData()
  }

  showData(){
    this.client.getRequestData("http://localhost:10101/consultUser").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
      //  this.documents = response.documents;
          console.log(response);
          this.form.controls.fullName.setValue(response.user.fullName);
          this.form.controls.email.setValue(response.user.email);    
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      this.router.navigate( ['/']);
      //this.dialog.open(LoginComponent);
      //se imprime el status del error
      console.log(error.status);
      }
    )
  }


  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      this.spinner = true;
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.updateRequestUpdateData('http://localhost:10101/updateData', {
        identificationNumber: this.form.value.identificationNumber,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        //password: this.form.value.password,
        cityCode: "63001",
        state:false
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          //se imprime la respuesta del server
          console.log(response);
          this.spinner = false;
          //this.router.navigate(['/']);
          //const dialogRef = this.dialog.open(LoginComponent);
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


