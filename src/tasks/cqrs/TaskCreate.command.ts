import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../entities/task.entity';
import { InMemoryTaskRepository } from '../tasks.repositoty';

export class TaskCreateCommand {
  constructor(public readonly name: string) {}
}

@CommandHandler(TaskCreateCommand)
export class TaskCreateCommandHandler
  implements ICommandHandler<TaskCreateCommand>
{
  constructor(private repository: InMemoryTaskRepository) {}

  async execute(command: TaskCreateCommand): Promise<Task> {
    return this.repository.add(command.name);
  }
}
