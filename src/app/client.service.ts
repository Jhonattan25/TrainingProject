import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //se inyecta el cliente http de Angular
  constructor(private http: HttpClient) { }

  //metodo que recibe como parametro una url un json a ser enviado. Esta solicitud se hace con metodo POST
  //en este caso el json proviene de los datos de un formulario.
  postRequestSendForm(route: string, data:any) {
    let config:any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["header"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }

    //metodo que recibe como parametro una url un json a ser enviado. Esta solicitud se hace con metodo POST
  //en este caso el json proviene de los datos de un formulario.
  postRequestLogin(route: string, data:any) {
    let config:any = {
      responseType: "json"
    }
      
    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["header"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }
}
