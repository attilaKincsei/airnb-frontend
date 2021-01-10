import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TodosService} from '../../services/todos/todos.service';
import {LodgingsService} from '../../services/lodgings/lodgings.service';
import {UserBuilder} from '../../models/builders/user.builder';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _user: User;
  private id: number;

  constructor(private userService: UsersService, private todosService: TodosService, private lodgingsService: LodgingsService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
     this.userService.getUserFromDB().subscribe( (response) => {
       const userData = response.json()['data'];
       console.log(userData);
       console.log(response.json());
       this._user = new UserBuilder(userData['id'])
         .setAddress(userData['address'])
         .setCity(userData['city'])
         .setCountry(userData['country'])
         .setFirstName(userData['firstName'])
         .setZipCode(userData['zipCode'])
         .setEmail(userData['email'])
         .setPhoneNumber(userData['phoneNumber'])
         .setSurname(userData['surname'])
         .builder();
     },
     (error) => {console.log(error); });
  }


  get user(): User {
    return this._user;
  }

  deleteUser() {
    this.userService.deleteUsersLodgings();
    this.userService.deleteUser(this.id);
    this.router.navigate(['lodgings']);
  }


}
