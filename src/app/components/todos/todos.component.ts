import { Component, OnInit } from '@angular/core';
import {TodosService} from '../../services/todos/todos.service';
import {Todo} from '../../models/todo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users/users.service';
import {Status} from '../../utils/status.enum';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  private _todos: Todo[];

  constructor(private todosService: TodosService, private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUserTodosFromServer().subscribe( response =>{

      console.log(response);
        this._todos = response;
    });


  }


  get todos(): Todo[] {
    return this._todos;
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id).subscribe(
      (response) => {
        if (response) { this.ngOnInit(); }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  isTodoDone(todo: Todo) {
    return todo.status === Status.DONE;
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
}
