import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users/users.service';
import {Router} from '@angular/router';
import {UserInfo} from '../../../utils/user-info';
import {Address} from '../../../models/address';
import {AuthService} from '../../../services/auth/auth.service';
import {PasswordMatcher} from '../../../utils/PasswordMatcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router, private authService: AuthService) { }

  editUserForm: FormGroup;

  ngOnInit() {
    this.editUserForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'surname': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'password_confirmation': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'phone_number': new FormControl(null, [Validators.required, Validators.minLength(12)]),
    }, PasswordMatcher.MatchPassword);
  }

  onSubmit(){

    const data = this.editUserForm.value;
    const signUpFOrm = new UserInfo(
      data['username'],
      data['first_name'],
      data['surname'],
      data['email'],
      data['phone_number'],
      data['password']
    );

    console.log(data);
    this.authService.signUp(signUpFOrm).subscribe(
      data => {
        this.router.navigate(['/login']);

      },
      error => {
        console.log(error);

      }
    );
  }




}
