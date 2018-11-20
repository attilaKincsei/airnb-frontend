import {LodgingsComponent} from '../../components/lodgings/lodgings.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TodosComponent} from '../../components/todos/todos.component';
import {LodgingAddComponent} from '../../components/lodgings/lodging-add/lodging-add.component';
import {UserLodgingsComponent} from '../../components/users/user-lodgings/user-lodgings.component';
import {UsersComponent} from '../../components/users/users.component';

const appRoutes = [
  {path: '', redirectTo: '/lodgings', pathMatch: 'full'},
  {path: 'lodgings', component: LodgingsComponent},
  {path: 'todos', component: TodosComponent},
  {path: 'lodgings/:id/add', component: LodgingAddComponent},
  {path: 'users/:id/lodgings', component: UserLodgingsComponent},
  {path: 'users/:id', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
