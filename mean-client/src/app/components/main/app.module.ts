import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { NewEmployeeComponent } from "../employee.new/newEmployee.component";
import { HomeComponent } from "../home/home.component";
import { EditEmployeeComponent } from "../employee.edit/edit.component";
import { DetailsEmployeeComponent } from "../employee.details/details.component";
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';
import { ListEmployeeComponent } from '../employee.list/list.component';
import { HeaderComponent } from '../header/header.component';

import { EmployeeService } from "../../services/employee.service";
import { UserService } from "../../services/user.service";
import { RequestProvider } from '../../providers/request.provider';
import { CookieProvider } from '../../providers/cookie.provider';
import { LocalStorageProvider } from '../../providers/localStorage.provider';
import { AuthGuard } from '../../providers/authGuard.provider';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NewEmployeeComponent,
    HomeComponent,
    EditEmployeeComponent,
    DetailsEmployeeComponent,
    LoginComponent,
    SignUpComponent,
    ListEmployeeComponent,
    HeaderComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
          {
            path: 'details/:id',
            component: DetailsEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'add',
            component: DetailsEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'edit/:id',
            component: DetailsEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: '',
            component: ListEmployeeComponent
          }
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '**', redirectTo: 'home' }
    ]),
    HttpModule
  ],
  providers: [EmployeeService, RequestProvider, UserService, CookieProvider, LocalStorageProvider, AuthGuard],

  bootstrap: [AppComponent]
})

export class AppModule { }
