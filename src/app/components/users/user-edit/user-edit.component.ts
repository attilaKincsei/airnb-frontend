import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users/users.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {PasswordMatcher} from '../../../utils/PasswordMatcher';
import {UserInfo} from '../../../utils/user-info';
import {Address} from '../../../models/address';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private id: number;
  private _user: User;

  editUserForm: FormGroup;

  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUserFromDB().subscribe(
      (response) => {
        this._user = response;
        this.setEditFormValues();
      },
      (error) => {
        console.log(error);
      }
    );

    this.editUserForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, []),
      'password_confirmation': new FormControl(null, []),
      'phone_number': new FormControl(null, [Validators.required]),
      'address': new FormGroup({
        'country': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'zip_code': new FormControl(null, [Validators.required]),
        'address': new FormControl(null, [Validators.required])
      })
    }, PasswordMatcher.MatchPassword);
  }

  onSubmit() {

    const data = this.editUserForm.value;
    const userInfo = new UserInfo(
      data['username'],
      data['first_name'],
      data['surname'],
      data['email'],
      data['phone_number'],
      new Address(data['country'], data['city'], data['zip_code'], data['address']),
      data['password'],
    );

    this.userService.updateUserInfo(userInfo).subscribe(
      (response) => {
        this.router.navigate(['/user']);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  get user(): User {
    return this._user;
  }

  private setEditFormValues() {
    this.editUserForm.setValue({
      'first_name': this._user.firstName,
      'surname': this._user.surname,
      'email': this._user.email,
      'phone_number': this._user.phoneNumber,
      'address': {
        'country': this._user.country,
        'city': this._user.city,
        'zip_code': this._user.zipCode,
        'address': this._user.address
      }
    });
  }
}
