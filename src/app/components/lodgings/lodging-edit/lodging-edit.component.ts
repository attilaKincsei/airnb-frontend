import { Component, OnInit } from '@angular/core';
import {Lodging} from '../../../models/lodging.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LodgingsService} from '../../../services/lodgings/lodgings.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../services/auth/token-storage/token-storage.service';

@Component({
  selector: 'app-lodging-edit',
  templateUrl: './lodging-edit.component.html',
  styleUrls: ['./lodging-edit.component.css']
})
export class LodgingEditComponent implements OnInit {

  private id: number;
  private _lodging: Lodging;
  editForm: FormGroup;
  error: false;

  constructor(private route: ActivatedRoute, private lodgingsService: LodgingsService, private router: Router
   , private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'lodging_name': new FormControl(null, Validators.required),
      'lodging_type': new FormControl(null, Validators.required),
      'daily_price': new FormControl(null, Validators.required),
      'electricity_bill': new FormControl(null, Validators.required),
      'gas_bill': new FormControl(null, Validators.required),
      'telecommunication_bill': new FormControl(null, Validators.required),
      'cleaning_cost': new FormControl(null, Validators.required),
      'address': new FormGroup({
        'country': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'zip_code': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
      }),
    });

    this.route.params.
    subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.setLodgingsForm(this.id);
      }
    );



  }


  get lodging(): Lodging {
    return this._lodging;
  }

  onSubmit() {

    const data = this.editForm.value;

    this._lodging.name = data['lodging_name'];
    this._lodging.lodgingsType = data['lodging_type'];
    this._lodging.pricePerDay = data['daily_price'];
    this._lodging.electricityBill = data['electricity_bill'];
    this._lodging.gasBill = data['gas_bill'];
    this._lodging.telecommunicationBill = data['telecommunication_bill'];
    this._lodging.cleaningCost = data['cleaning_cost'];
    this._lodging.fullAddress.country = data['address']['country'];
    this._lodging.fullAddress.city = data['address']['city'];
    this._lodging.fullAddress.zipCode = data['address']['zip_code'];
    this._lodging.fullAddress.address = data['address']['address'];

    this.lodgingsService.updateLodgings(this._lodging).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/lodgings/own']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private setLodgingsForm(id: number) {
    this.lodgingsService.getLodgingsById(id).subscribe(
      (lodging: Lodging) => {
        this._lodging = lodging;
        this.hasPermission();
        this.setLodgingsFormValues(lodging);
      }
    );
  }

  private hasPermission() {
    if (this.lodging.landlord.username !== this.tokenStorage.getUsername()) {
      this.router.navigate(['/lodgings/own']);
    }
  }

  private setLodgingsFormValues(lodging: Lodging) {
    this.editForm.setValue({
      'lodging_name': lodging.name,
      'lodging_type': lodging.lodgingsType,
      'daily_price': lodging.pricePerDay,
      'electricity_bill': lodging.electricityBill,
      'gas_bill': lodging.gasBill,
      'telecommunication_bill': lodging.telecommunicationBill,
      'cleaning_cost': lodging.cleaningCost,
      'address': {
        'country': lodging.fullAddress.address,
        'city': lodging.fullAddress.city,
        'zip_code': lodging.fullAddress.zipCode,
        'address': lodging.fullAddress.address,
    }
  });
}

}
