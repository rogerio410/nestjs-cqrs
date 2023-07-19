import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Task } from '../entities/task.entity';
import { InMemoryTaskRepository } from '../tasks.repositoty';

export class TaskGetAllQuery {}

@QueryHandler(TaskGetAllQuery)
export class TaskGetAllHandler implements IQueryHandler<TaskGetAllQuery> {
  constructor(private repository: InMemoryTaskRepository) {}

  async execute(_query: TaskGetAllQuery): Promise<Task[]> {
    return this.repository.all();
  }
}
