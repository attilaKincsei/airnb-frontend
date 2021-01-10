export class Address {
   country: string;
   city: string;
   zipCode: string;
   address: string;


  constructor(country: string, city: string, zipCode: string, fullAddress: string) {
    this.country = country;
    this.city = city;
    this.zipCode = zipCode;
    this.address = fullAddress;
  }


}
