import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** UseCase **/
import { CreateEventUseCase } from './application/CreateEvent/CreateEventUseCase';
import { EditEventUseCase } from './application/EditEvent/EditEventUseCase';
import { FindAllEventUseCase } from './application/FindAllEvent/FindAllEventUseCase';
import { FindEventByTitleUseCase } from './application/FindEventByTitle/FindEventByTitleUseCase';
import { FindOneEventUseCase } from './application/FindOneEvent/FindOneEventUseCase';

/** Controller **/
import { EventController } from './presentation/EventController/EventController';
import { CreateEventController } from './presentation/CreateEventController/CreateEventController';
import { EditEventController } from './presentation/EditEventController/EditEventController';

/** Entities **/
import { EventEntity } from './infra/entity/EventEntity';

/** Repository Implements **/
import { MySqlEventRepository } from './infra/mysql/MySqlEventRepository';

/** Repository Interfaces **/
import { EVENT_REPOSITORY } from './infra/interface/IEventRepository';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],

  exports: [],
  controllers: [EventController, CreateEventController, EditEventController],
  providers: [
    CreateEventUseCase,
    FindAllEventUseCase,
    FindOneEventUseCase,
    FindEventByTitleUseCase,
    EditEventUseCase,
    {
      provide: EVENT_REPOSITORY,
      useClass: MySqlEventRepository,
    },
  ],
})
export class EventsModule {}
