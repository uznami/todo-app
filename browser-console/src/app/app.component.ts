import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  tempTodoText = '';
  submitting = false;

  constructor(private todoservice: TodoService) {
  }

  async ngOnInit() {
    this.todos = await this.todoservice.getTodos();
  }

  async submit() {
    this.submitting = true;
    this.todos = await this.todoservice.appendTodo(this.tempTodoText);
    this.tempTodoText = '';
    this.submitting = false;
  }

  async toggle(index: number) {
    this.todos = await this.todoservice.toggleTodo(index);
  }

  trackTodo(index: number, item: Todo): string {
    return item.text;
  }

}
