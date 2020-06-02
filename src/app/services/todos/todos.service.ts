import { Injectable } from '@angular/core';
import {Todo} from '../../models/todo.model';
import {Observable} from 'rxjs';
import {LodgingsService} from '../lodgings/lodgings.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private baseUrl = 'http://localhost:8080/api/todos/';

  constructor(private lodgingsService: LodgingsService, private http: HttpClient) { }

  addNewTodo(lodgingsId: number, todo: Todo) {
    return this.http.post<string>(this.baseUrl + lodgingsId, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete<string>(this.baseUrl + id);
  }

  markTodoAsDone(todo: Todo) {
    return this.http.put(this.baseUrl + todo.id, todo);
  }
}
