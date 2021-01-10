import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Lodging} from '../../../models/lodging.model';
import {LodgingsService} from '../../../services/lodgings/lodgings.service';
import {Address} from '../../../models/address';

@Component({
  selector: 'app-lodging-add',
  templateUrl: './lodging-add.component.html',
  styleUrls: ['./lodging-add.component.css']
})
export class LodgingAddComponent implements OnInit {

  constructor(private router: Router, private lodgingService: LodgingsService) { }

  addLodgingsForm: FormGroup;
  error = false;

  ngOnInit() {
    this.addLodgingsForm = new FormGroup({
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
   this.addLodgingsForm.controls['lodging_type'].setValue('APARTMENT',{onlySelf: true});
  }

  onSubmit(){
    const data = this.addLodgingsForm.value;
    console.log(this.addLodgingsForm.value);
    const lodging: Lodging = new Lodging();
    lodging.name = data['lodging_name'];
    lodging.lodgingsType = data['lodging_type'];
    lodging.pricePerDay = data['daily_price'];
    lodging.electricityBill = data['electricity_bill'];
    lodging.gasBill = data['gas_bill'];
    lodging.telecommunicationBill = data['telecommunication_bill'];
    lodging.cleaningCost = data['cleaning_cost'];
    lodging.fullAddress = new Address(data['address']['country'], data['address']['city'], data['address']['zip_code'], data['address']['address']);


    this.lodgingService.addLodgings(lodging).subscribe(
      (response) => {
        console.log(response);
        this.error = false;
        this.router.navigate(['/lodgings/own']);
      },
      (error) => {
        console.log(error);
        this.error = true;
      }
    );
  }

}
