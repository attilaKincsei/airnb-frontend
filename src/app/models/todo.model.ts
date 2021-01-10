import {Status} from '../utils/status.enum';

export class Todo{
     id: number;
     name: string;
     deadline: string;
     description: string;
     price: number;
     status: Status = Status.NEW;


  constructor(id: number, name: string, deadline: string, description: string, price: number, status: Status) {
    this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.description = description;
    this.price = price;
    this.status = status;
  }
}
