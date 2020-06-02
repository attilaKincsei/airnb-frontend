import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LodgingsService} from '../../../services/lodgings/lodgings.service';
import {Lodging} from '../../../models/lodging.model';
import {TodosService} from '../../../services/todos/todos.service';
import {Todo} from '../../../models/todo.model';
import {Status} from '../../../utils/status.enum';
import {User} from '../../../models/user.model';
import {TokenStorageService} from '../../../services/auth/token-storage/token-storage.service';

@Component({
  selector: 'app-lodging-details',
  templateUrl: './lodging-details.component.html',
  styleUrls: ['./lodging-details.component.css']
})
export class LodgingDetailsComponent implements OnInit {

  private id: number;
  private _lodging: Lodging;
  isLandlord = false;

  constructor(private route: ActivatedRoute, private lodgingsService: LodgingsService,
              private todosService: TodosService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params) => {
        console.log(params['id']);
        this.id = +params['id'];
      }
    );

    this.lodgingsService.getLodgingsById(this.id).subscribe((response) => {
      console.log(response);
      this._lodging = response;
      if (this._lodging.landlord.username === this.tokenStorage.getUsername()){
        this.isLandlord = true;
      }
    });

    console.log(this.isLandlord);
  }


  get lodging(): Lodging {
    return this._lodging;
  }

  deleteLodgings(){
    this.lodgingsService.deleteLodgings(this._lodging.id).subscribe(
      (response) => {
        if (response) {this.router.navigate(['lodgings']); }
      },
      (error) => {
        console.log(error);
      }
    );


  }


  addTodo() {
    this.router.navigate(['/todos', this._lodging.id, 'add']);
  }

  markAsDone(todo: Todo) {
    this.todosService.markTodoAsDone(todo).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteToDo(id: number) {
    this.todosService.deleteTodo(id).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isTodoDone(todo: Todo) {
    return todo.status === Status.DONE;
  }

  sortByStatus() {
    this.lodging.todos.sort((a, b) => {
      if (a.status === Status.DONE && b.status === Status.NEW) { return 1; }
      if (a.status === Status.NEW && b.status === Status.DONE) { return -1; }
      return 0;
    });
    return this.lodging.todos;
  }

  removeTenants(lodgingsId: number) {
    this.lodgingsService.removeTenants(lodgingsId).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
