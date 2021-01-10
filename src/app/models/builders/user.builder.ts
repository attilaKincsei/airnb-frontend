import {User} from '../user.model';
import {Lodging} from '../lodging.model';
import {UserType} from '../../utils/userType.enum';

export class UserBuilder {
  private _id: number;
  private _firstName: string;
  private _surname: string;
  private _email: string;
  private _phoneNumber: string;
  private _country: string;
  private _city: string;
  private _zipCode: string;
  private _address: string;
  private _password: string;

  private _propertyManagerLodgings: Lodging[];
  private _landlordLodgings: Lodging[];
  private _userType: UserType;


  constructor(id: number) {
    this._id = id;
  }


  get id(): number {
    return this._id;
  }

  setId(value: number): UserBuilder {
    this._id = value;
    return this;
  }

  get firstName(): string {
    return this._firstName;
  }

  setFirstName(value: string): UserBuilder {
    this._firstName = value;
    return this;
  }

  get surname(): string {
    return this._surname;
  }

  setSurname(value: string): UserBuilder {
    this._surname = value;
    return this;
  }

  get email(): string {
    return this._email;
  }

  setEmail(value: string): UserBuilder {
    this._email = value;
    return this;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  setPhoneNumber(value: string): UserBuilder {
    this._phoneNumber = value;
    return this;
  }

  get country(): string {
    return this._country;
  }

  setCountry(value: string): UserBuilder {
    this._country = value;
    return this;
  }

  get city(): string {
    return this._city;
  }

  setCity(value: string): UserBuilder {
    this._city = value;
    return this;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  setZipCode(value: string): UserBuilder {
    this._zipCode = value;
    return this;
  }

  get address(): string {
    return this._address;
  }

  setAddress(value: string): UserBuilder {
    this._address = value;
    return this;
  }

  get password(): string {
    return this._password;
  }

  setPassword(value: string): UserBuilder {
    this._password = value;
    return this;
  }

  get propertyManagerLodgings(): Lodging[] {
    return this._propertyManagerLodgings;
  }

  setppropertyManagerLodgings(value: Lodging[]): UserBuilder {
    this._propertyManagerLodgings = value;
    return this;
  }

  get landlordLodgings(): Lodging[] {
    return this._landlordLodgings;
  }

  setLandlordLodgings(value: Lodging[]): UserBuilder {
    this._landlordLodgings = value;
    return this;
  }

  get userType(): UserType {
    return this._userType;
  }

  setUserType(value: UserType) : UserBuilder {
    this._userType = value;
    return this;
  }


  builder(): User{
    return new User(this);
  }
}
