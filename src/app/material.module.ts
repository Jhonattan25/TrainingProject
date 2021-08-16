import { NgModule } from "@angular/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    exports: [MatMenuModule,
              MatButtonModule, 
              MatToolbarModule, 
              MatIconModule, 
              MatCardModule,
              MatInputModule,
              MatCheckboxModule]
})

export class MaterialModule{}