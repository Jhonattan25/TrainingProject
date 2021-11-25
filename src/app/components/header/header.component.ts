import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {SecurityService} from '../../services/security.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:boolean = localStorage.getItem('token')?true:false;

  constructor(private router: Router, private dialog: MatDialog, private security:SecurityService) { }

  ngOnInit(): void {
    this.verifyLogin();
  }

  verifyLogin(){
    this.security.verifyLogin().subscribe(
      (response) => this.login = response, (err) => console.log(err)
    );
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

  showDocumentsLost(){
    this.router.navigate(['/consultLost']);
  }

  showDocumentsFound(){
    this.router.navigate(['/consultFound']);
  }

  showUpdateData(){
    this.router.navigate(['/updateData']);
  }

  showSignOff(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}