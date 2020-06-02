import {Todo} from './todo.model';
import {User} from './user.model';
import {Address} from './address';

export class Lodging {
   id: number;
   name: string;
  lodgingsType: string;
   fullAddress: Address;

   pricePerDay: number;
   electricityBill: number;
   gasBill: number;
   telecommunicationBill: number;
   cleaningCost: number;

   todos: Todo[];
   landlord: User;
   tenants: User;

}
