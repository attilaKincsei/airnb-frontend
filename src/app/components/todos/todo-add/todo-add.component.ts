import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodosService} from '../../../services/todos/todos.service';
import {Todo} from '../../../models/todo.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LodgingsService} from '../../../services/lodgings/lodgings.service';
import {Status} from '../../../utils/status.enum';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  private lodgingId: number;
  addTodoForm: FormGroup;

  constructor(private todoService: TodosService, private lodgingService: LodgingsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params['lodging_id']);
        this.lodgingId = +params['lodging_id'];
      }
    );

    this.addTodoForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    const data = this.addTodoForm.value;
    const todo = new Todo(null, data['name'], data['date'], data['description'], data['price'], Status.NEW);

    this.todoService.addNewTodo(this.lodgingId, todo).subscribe(
      () => {
        this.router.navigate(['/lodgings', this.lodgingId]);
      },
      (error) => {
        console.log(error);
      }

    );
}
}
