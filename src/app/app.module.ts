import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LodgingsComponent } from './components/lodgings/lodgings.component';
import { TodosComponent } from './components/todos/todos.component';
import { LodgingDetailsComponent } from './components/lodgings/lodging-details/lodging-details.component';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import { LodgingAddComponent } from './components/lodgings/lodging-add/lodging-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LodgingEditComponent } from './components/lodgings/lodging-edit/lodging-edit.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { TodoAddComponent } from './components/todos/todo-add/todo-add.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './security/auth-interceptor';
import { LogoutComponent } from './components/auth/logout/logout.component';
import {InviteComponent} from './components/lodgings/add-tenants/invite.component';


@NgModule({
  declarations: [
    AppComponent,
    LodgingsComponent,
    TodosComponent,
    LodgingDetailsComponent,
    LodgingAddComponent,
    LodgingEditComponent,
    UserEditComponent,
    TodoAddComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    InviteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
