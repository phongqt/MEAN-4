import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { NewEmployeeComponent } from "../employee.new/employee.new.component";
import { HomeComponent } from "../home/home.component";
import { EditEmployeeComponent } from "../employee.edit/employee.edit.component";
import { DetailsEmployeeComponent } from "../employee.details/employee.details.component";
import { LoginComponent } from '../login/login.component';
import { ListEmployeeComponent } from '../employee.list/employee.list.component';
import { HeaderComponent } from '../header/header.component';
import { ProfileComponent } from '../profile/profile.component';
import { NewUserComponent } from '../user.new/user.new.component';

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
    ListEmployeeComponent,
    HeaderComponent,
    ProfileComponent,
    NewUserComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'details/:id',
            component: DetailsEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'add',
            component: NewEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'edit/:id',
            component: EditEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'list',
            component: ListEmployeeComponent, canActivate: [AuthGuard]
          },
          {
            path: 'profile',
            component: ProfileComponent, canActivate: [AuthGuard]
          },
          {
            path: 'user-add',
            component: NewUserComponent, canActivate: [AuthGuard]
          }
        ]
      },
      { path: 'login', component: LoginComponent },      
      { path: '**', redirectTo: 'dashboard' }
    ]),
    HttpModule
  ],
  providers: [EmployeeService, RequestProvider, UserService, CookieProvider, LocalStorageProvider, AuthGuard],

  bootstrap: [AppComponent]
})

export class AppModule { }
