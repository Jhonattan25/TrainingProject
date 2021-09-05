import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConsultFoundComponent } from "./pages/consult-found/consult-found.component";
import { ConsultLostComponent } from "./pages/consult-lost/consult-lost.component";
import { HomeComponent } from "./pages/home/home.component";
import { ReportFoundComponent } from "./pages/report-found/report-found.component";
import { ReportLostComponent } from "./pages/report-lost/report-lost.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'reportLost', component: ReportLostComponent},
    {path: 'reportFound', component: ReportFoundComponent},
    {path: 'consultLost', component: ConsultLostComponent},
    {path: 'consultFound', component: ConsultFoundComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}