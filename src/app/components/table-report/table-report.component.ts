import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {

  @Input() documents!:Array<any>;

  constructor() { }

  ngOnInit(): void {
  }
}
