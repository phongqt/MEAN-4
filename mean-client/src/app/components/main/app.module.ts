import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { newEmployeeComponent } from "../employee.new/newEmployee.component";
import { homeComponent } from "../home/home.component";
import { editComponent } from "../employee.edit/edit.component";
import { detailsComponent } from "../employee.details/details.component";
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';

import { EmployeeService } from "../../services/employee.service";
import { UserService } from "../../services/user.service";
import { RequestProvider } from '../../providers/request.provider';
import { CookieProvider } from '../../providers/cookie.provider';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    newEmployeeComponent,
    homeComponent,
    editComponent,
    detailsComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: homeComponent },
      { path: 'details/:id', component: detailsComponent },
      { path: 'add', component: newEmployeeComponent },
      { path: 'edit/:id', component: editComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '**', redirectTo: 'home' }
    ]),
    HttpModule
  ],
  providers: [EmployeeService, RequestProvider, UserService, CookieProvider],

  bootstrap: [AppComponent]
})

export class AppModule { }
