import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';  

import { AppComponent } from './app.component';
import {NavMenuComponent}  from '../navmenu/navmenu.component';  
import { newEmployeeComponent } from "../newEmployee/newEmployee.component";  
import {homeComponent}  from "../home/home.component";  
import {editComponent} from "../edit/edit.component";  
import {detailsComponent} from "../details/details.component";  
import {EmployeeService} from "../../services/employee.service";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    newEmployeeComponent,
    homeComponent,
    editComponent,
    detailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([  
            { path: '', redirectTo: 'home', pathMatch: 'full' },  
            { path: 'home', component: homeComponent },  
            { path: 'details/:id', component: detailsComponent },  
            { path: 'new', component: newEmployeeComponent },  
            { path: 'edit/:id', component: editComponent },  
            { path: '**', redirectTo: 'home' }  
        ]),  
    HttpModule
  ],
  providers: [EmployeeService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
