import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormReportComponent } from './components/form-report/form-report.component';
import { ReportLostComponent } from './pages/report-lost/report-lost.component';
import { ReportFoundComponent } from './pages/report-found/report-found.component';
import { TableReportComponent } from './components/table-report/table-report.component';
import { ConsultLostComponent } from './pages/consult-lost/consult-lost.component';
import { ConsultFoundComponent } from './pages/consult-found/consult-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    FormReportComponent,
    ReportLostComponent,
    ReportFoundComponent,
    TableReportComponent,
    ConsultLostComponent,
    ConsultFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
