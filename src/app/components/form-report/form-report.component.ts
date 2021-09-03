import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.css']
})
export class FormReportComponent implements OnInit {
  @Input() title:any;
  constructor() { }
  ngOnInit(): void {
  }
}