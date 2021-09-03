import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showHome(){
    this.router.navigate(['/']);
  }

  showReportLost(){
    this.router.navigate(['/reportLost']);
  }

  showReportFound(){
    this.router.navigate(['/reportFound']);
  }

  showLogin(){
    const dialogRef = this.dialog.open(LoginComponent);
  }
}