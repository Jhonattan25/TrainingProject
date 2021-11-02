import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  documentNumber = new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
  showWarning:boolean = false;
  showDocuments:boolean = true;

  constructor() { }
  ngOnInit(): void {
  }
  value = 'Clear me';
  mail:string = "hola@gmail.com"

  consultDocument(category:number){
    console.log(this.documentNumber.dirty);

    if(!this.documentNumber.errors){
      this.showWarning = true;
      setTimeout(()=>{
        this.showWarning = false;
      }, 2000);
    }else{
      this.showWarning = true;
      setTimeout(()=>{
        this.showWarning = false;
      }, 2000);
    }
    
  }
}
