import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class InMemoryTaskRepository {
  private tasks: Task[] = [];

  add(name: string) {
    const newTask = new Task(name);
    this.tasks.push(newTask);

    return newTask;
  }

  all() {
    return this.tasks;
  }

  get(id: string) {
    return this.tasks.find((t) => t.id === id);
  }

  save(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      this.tasks[index] = task;
      return task;
    }
  }
}
