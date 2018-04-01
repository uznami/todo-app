import * as fs from 'fs-extra';

export interface Todo {
    done: boolean;
    text: string;
}

namespace TodoDriver {
    const TodoFilePath = '/home/todos.json';

    export async function createIfNotExists(): Promise<void> {
        if (!fs.existsSync(TodoFilePath)) {
            await fs.writeFile(TodoFilePath, JSON.stringify([]));
        }
    }

    export async function loadAll(): Promise<Todo[]> {
        const todosBuffer = await fs.readFile(TodoFilePath);
        return JSON.parse(todosBuffer.toString());
    }

    export async function storeAll(todos: Todo[]): Promise<void> {
        await fs.writeFile(TodoFilePath, JSON.stringify(todos));
    }

}

export namespace TodoService {

    export async function all(): Promise<Todo[]> {
        return TodoDriver.loadAll();
    }

    export async function append(text: string): Promise<Todo[]> {
        const todos = await TodoDriver.loadAll();
        todos.push({ done: false, text });
        await TodoDriver.storeAll(todos);
        return todos;
    }

    export async function toggle(index: number): Promise<Todo[]> {
        const todos = await TodoDriver.loadAll();
        todos[index].done = !todos[index].done;
        await TodoDriver.storeAll(todos);
        return todos;
    }

}
