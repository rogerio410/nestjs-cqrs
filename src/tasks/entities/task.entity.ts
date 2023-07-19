import { AggregateRoot } from '@nestjs/cqrs';
import { ulid } from 'ulidx';
import { TaskCompletedEvent } from '../cqrs/TaskCompleted.event';

export class Task extends AggregateRoot {
  id: string;
  name: string;
  status: 'TODO' | 'DOING' | 'DONE';

  constructor(name: string) {
    super();
    this.id = ulid();
    this.name = name;
    this.status = 'TODO';
  }

  complete() {
    this.status = 'DONE';
    this.apply(new TaskCompletedEvent(this.id));
  }
}
