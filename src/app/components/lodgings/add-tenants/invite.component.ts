import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Lodging} from '../../../models/lodging.model';
import {LodgingsService} from '../../../services/lodgings/lodgings.service';
import {UsersService} from '../../../services/users/users.service';
import {InviteForm} from '../../../utils/InviteForm';
import {ActivatedRoute, Params, Router, Routes} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage/token-storage.service';


@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  inviteForm: FormGroup;
  lodgingsId: number;
  added = false;

  constructor(private userService: UsersService, private lodgingsService: LodgingsService,
              private route: ActivatedRoute, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.inviteForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });

    this.route.params.
    subscribe(
      (params: Params) => {
        console.log(params['id']);
        this.lodgingsId = +params['id'];
        this.hasPermission();
      }
    );

  }

  private hasPermission() {
    this.lodgingsService.getLodgingsById(this.lodgingsId).subscribe(
      (response) => {
        if (response.landlord.username !== this.tokenStorage.getUsername()) {
          this.router.navigate(['/lodgings/own']);
        }
      }
    );
  }

  onSubmit(){
    const data = this.inviteForm.value;
    const invite = new InviteForm(data['email'], this.lodgingsId);
    this.lodgingsService.sendNewEnvite(invite).subscribe(
      (response) => {
        this.router.navigate(['/lodgings/own']);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
