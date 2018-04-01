import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    async getTodos(): Promise<Todo[]> {
      const response = await fetch('/api/todos');
      return await response.json();
    }

    async appendTodo(text: string): Promise<Todo[]> {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      return await response.json();
    }

    async toggleTodo(index: number): Promise<Todo[]> {
      const response = await fetch(`/api/todos/${index}`, { method: 'PATCH' });
      return await response.json();
    }
}
