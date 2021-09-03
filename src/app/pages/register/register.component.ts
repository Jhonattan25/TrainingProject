import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cities: Array<any> = [
    {value: '1', viewValue: 'Armenia'},
    {value: '2', viewValue: 'Montenegro'},
    {value: '3', viewValue: 'Calarca'}
  ];
}
