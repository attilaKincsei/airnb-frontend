import {AbstractControl} from '@angular/forms';

export class PasswordMatcher {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('password_confirmation').value; // to get value in input tag
    if(password !== confirmPassword) {
      console.log(AC);
      AC.get('confirmPassword').setErrors( {MatchPassword: true});
    } else {
      console.log('true');
      return null;
    }
  }
}
