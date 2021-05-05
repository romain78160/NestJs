import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './Dto/todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Titre todo',
      description: 'faire ce todo',
      done: false,
    },
    {
      id: 2,
      title: 'Course',
      description: 'Acheter du pain',
      done: false,
    },
    {
      id: 3,
      title: 'Lettre',
      description: 'Poster la lettre',
      done: true,
    },
    {
      id: 4,
      title: 'Loyer',
      description: "Payer loyer du mois d'avril",
      done: false,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  create(aTodo: Todo) {
    aTodo.id = this.todos.length + 1;
    this.todos = [...this.todos, aTodo];
  }

  update(id: number, aTodo: UpdateTodoDto) {
    //trouver le todo
    let todoToUpdate = this.findOne(id);

    if (!todoToUpdate) {
      return new NotFoundException('Todo not found');
    } else {
      todoToUpdate = { ...todoToUpdate, ...aTodo };
    }
    //parcourir le tableau pour modifier que celui qu'on vient ce modifier
    const updatedTodos = this.todos.map((t) =>
      t.id !== id ? t : todoToUpdate,
    );
    //application du nouveau tableau
    this.todos = [...updatedTodos];

    return { updated: 1, todos: this.todos };
  }

  delete(id: number) {
    const lengthBefore = this.todos.length;
    const aTodo = this.findOne(id);
    if (aTodo) {
      this.todos = [...this.todos.filter((t) => t.id !== +id)];
    }

    if (this.todos.length < lengthBefore) {
      return { deletedTodos: 1, newLength: this.todos.length };
    } else {
      return new NotFoundException('Delete impossible: todo not found');
    }
  }
}
