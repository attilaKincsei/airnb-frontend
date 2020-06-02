import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../../models/user.model';
import {UsersService} from '../../../services/users/users.service';
import {Router} from '@angular/router';
import {AuthLoginInfo} from '../../../utils/login-info';
import {AuthService} from '../../../services/auth/auth.service';
import {TokenStorageService} from '../../../services/auth/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(){
    const data = this.loginForm.value;
    const loginForm = new AuthLoginInfo(data['username'], data['password']);
    this.authService.attemptAuth(loginForm).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.authService.lodgedIn = true;
        console.log('OK');
        this.router.navigate(['/lodgings/rented']);
      },
      error => {
        console.log(error);

      }
    );

  }

}
