import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../entities/task.entity';
import { InMemoryTaskRepository } from '../tasks.repositoty';

export class TaskCompleteCommand {
  constructor(public readonly taskId: string) {}
}

@CommandHandler(TaskCompleteCommand)
export class TaskCompleteCommandHandler
  implements ICommandHandler<TaskCompleteCommand>
{
  constructor(
    private repository: InMemoryTaskRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: TaskCompleteCommand): Promise<Task> {
    const task = this.publisher.mergeObjectContext(
      this.repository.get(command.taskId),
    );

    task.complete();
    this.repository.save(task);

    task.commit();

    return task;
  }
}
