import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  documents:Array<any> = [
    {numero:123, nombre:'Pedro', fecha:'2021-05-02'},
    {numero:456, nombre:'Pepe', fecha:'2021-02-01'},
    {numero:789, nombre:'Sara', fecha:'2020-12-25'}
  ];
}
