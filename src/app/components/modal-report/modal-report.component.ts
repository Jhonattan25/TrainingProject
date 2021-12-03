import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.component.html',
  styleUrls: ['./modal-report.component.css']
})
export class ModalReportComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  spinner: boolean = false;
  @Input() element: any;
  form!: FormGroup;
  cities!: Array<any>;
  documentType!: Array<any>;

  constructor(private client: ClientService, private fb: FormBuilder, public dialog:MatDialogRef<ModalReportComponent>, 
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
    this.consultCities();
    this.consultDocumentsTypes();

    this.form = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.min(10000000), Validators.max(9999999999)]],
      fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cityCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
      description: ['', Validators.maxLength(1000)]
    });
  }

  consultCities() {
    this.client.getRequestConsultCities("http://localhost:10101/consultCities").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.cities = response.cities;
        console.log(response);
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        console.log(error.status);
      }
    )
  }

  consultDocumentsTypes() {
    this.client.getRequestConsultDocumentTypes("http://localhost:10101/consultDocumentType").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.documentType = response.documentType;
        console.log("Respuesta", response.documentType);
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        console.log(error.status);
      }
    )
  }

  onSubmit(){
    
  }

}
