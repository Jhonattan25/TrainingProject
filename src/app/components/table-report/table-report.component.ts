import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalReportComponent } from '../modal-report/modal-report.component';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit, AfterViewInit {

  @Input() documents!: Array<any>;
  //  displayedColumns: string[] = ['No', 'Número de documento', 'Nombre completo', 'Ciudad', 'Fecha de reporte'];

  displayedColumns: string[] = ['id', 'documentNumber', 'fullName', 'cityName', 'date', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.dataSource.data = this.documents;
    }, 2000);
  }

  ngAfterViewInit() {
    console.log("HELLO" + this.documents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditReportDocument(element:any){
    this.openDialog(element);
  }

  onDeleteReportDocument(element:any){
    Swal.fire({
      icon: 'question',
      title: '¿Desea deshabilitar este reporte?',
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
      showConfirmButton: true,
      confirmButtonText: `Deshabilitar`,
      confirmButtonColor: '#488D95'
    }).then((result) => {
      //Read more about isConfirmed, isDenied below
      if (result.isConfirmed) {
        console.log('Reporte deshabilitado');
        
      } else if (result.isDenied) {
        Swal.fire('El reporte no se ha deshabilitado', '', 'info')
      }
    });
  }

  openDialog(element:any):void{
    const config = {
      data:{
        message: element ? 'Editar reporte' : 'Error',
        content: element
      }
    };

    const dialogRef = this.dialog.open(ModalReportComponent, config);
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Result ${result}`);
    });
  }
}
