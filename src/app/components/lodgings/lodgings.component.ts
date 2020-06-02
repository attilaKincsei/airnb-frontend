import { Component, OnInit } from '@angular/core';
import {LodgingsService} from '../../services/lodgings/lodgings.service';
import {Lodging} from '../../models/lodging.model';
import {UsersService} from '../../services/users/users.service';
import {TokenStorageService} from '../../services/auth/token-storage/token-storage.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-lodgings',
  templateUrl: './lodgings.component.html',
  styleUrls: ['./lodgings.component.css']
})
export class LodgingsComponent implements OnInit {

  private _lodgings: Lodging[];
  title: string;

  constructor(private lodgingsService: LodgingsService,
              private userService: UsersService, private tokenStorage: TokenStorageService,
              public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.url.subscribe(params => {
      if(params[1].path === 'own'){
        this.userService.getLandlordLodgingsFromServer().subscribe((response) => {
          this._lodgings = response;
          this.title = 'Owned';
        });
      } else if (params[1].path === 'rented') {
        this.userService.getUserLodgingsFromServer().subscribe((response) => {
          this._lodgings = response;
          this.title = 'Rented';
        });
      } else {
        console.log('erorrrr');
      }
    });

  }

  get lodgings(): Lodging[] {
    return this._lodgings;
  }

}
