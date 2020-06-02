import { Component } from '@angular/core';
import {UsersService} from './services/users/users.service';
import {AuthService} from './services/auth/auth.service';
import {TokenStorageService} from './services/auth/token-storage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  constructor(private userService: UsersService, private auth: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  logedIn(){
    return this.auth.isLogedIn();
  }

  getUsername() {
    return this.tokenStorage.getUsername();
  }

}
