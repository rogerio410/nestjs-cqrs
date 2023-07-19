import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export class TaskCompletedEvent {
  constructor(public readonly taskId: string) {}
}

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedEventHandler
  implements IEventHandler<TaskCompletedEvent>
{
  handle(event: TaskCompletedEvent) {
    console.log(`EMAIL: Task ${event.taskId} FINALIZADA!`);
  }
}
