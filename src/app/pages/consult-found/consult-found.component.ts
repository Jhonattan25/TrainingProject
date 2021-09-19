import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-consult-found',
  templateUrl: './consult-found.component.html',
  styleUrls: ['./consult-found.component.css']
})
export class ConsultFoundComponent implements OnInit {
  documents!:Array<any>;

  constructor(public client:ClientService, private router: Router) { }

  ngOnInit(): void {
    this.uploadDocument();
  }

  uploadDocument(){
    this.client.getRequestFoundDocuments("http://localhost:10101/foundDocuments").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.documents = response.documents;
        console.log(response);
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      this.router.navigate( ['/']);
      //se imprime el status del error
      console.log(error.status);
      }
    )
  }

}
