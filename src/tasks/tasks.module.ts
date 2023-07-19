import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskCompleteCommandHandler } from './cqrs/TaskComplete.command';
import { TaskCompletedEventHandler } from './cqrs/TaskCompleted.event';
import { TaskCreateCommandHandler } from './cqrs/TaskCreate.command';
import { TaskGetAllHandler } from './cqrs/TaskGetAll.query';
import { TasksController } from './tasks.controller';
import { InMemoryTaskRepository } from './tasks.repositoty';
import { TasksService } from './tasks.service';

const CommandaHandlers = [TaskCreateCommandHandler, TaskCompleteCommandHandler];
const QueryHandlers = [TaskGetAllHandler];
const EventHandlers = [TaskCompletedEventHandler];

@Module({
  imports: [CqrsModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    InMemoryTaskRepository,
    ...CommandaHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class TasksModule {}
