import { Controller, Get, Param } from '@nestjs/common';
import { EmptyFoundResponse } from '../../../shared/core/Controller/EmptyFoundResponse';
import { FindAllEventUseCase } from '../../application/FindAllEvent/FindAllEventUseCase';
import {
  FindAllResponse,
  FindByEventTitleResponse,
  FindOneResponse,
  IEvent,
} from './dto/EventControllerResponse';
import { FindOneEventUseCase } from '../../application/FindOneEvent/FindOneEventUseCase';
import { FindEventByTitleUseCase } from '../../application/FindEventByTitle/FindEventByTitleUseCase';

@Controller('event')
export class EventController {
  constructor(
    private readonly findAllEventUseCase: FindAllEventUseCase,
    private readonly findOneEventUseCase: FindOneEventUseCase,
    private readonly findEventByTitleUseCase: FindEventByTitleUseCase,
  ) {}

  @Get()
  async findAll(): Promise<FindAllResponse | EmptyFoundResponse> {
    const foundResult = await this.findAllEventUseCase.execute();

    if (foundResult.code === 'NOTFOUND') {
      return {
        useCase: 'findAll',
        reason: '조회 결과 값이 비어있습니다.(값이 없습니다.)',
      };
    }

    return {
      events: foundResult.events.map((event): IEvent => {
        return {
          exposure: event.eventExposure.value,
          title: event.eventTitle.value,
          description: event.eventDescription.value,
          startDate: event.eventStartDate.value,
          endDate: event.eventEndDate.value,
        };
      }),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<FindOneResponse | EmptyFoundResponse> {
    const foundResult = await this.findOneEventUseCase.execute({
      id: id,
    });

    if (foundResult.code === 'NOTFOUND') {
      return {
        useCase: 'findOne',
        reason: '조회 결과 값이 비어있습니다.(값이 없습니다.)',
      };
    }

    return {
      event: {
        exposure: foundResult.event.eventExposure.value,
        title: foundResult.event.eventTitle.value,
        description: foundResult.event.eventDescription.value,
        startDate: foundResult.event.eventStartDate.value,
        endDate: foundResult.event.eventEndDate.value,
      },
    };
  }

  @Get(':title')
  async findEventByTitle(
    @Param('title') title: string,
  ): Promise<FindByEventTitleResponse | EmptyFoundResponse> {
    const foundResult = await this.findEventByTitleUseCase.execute({
      title: title,
    });

    if (foundResult.code === 'NOTFOUND') {
      return {
        useCase: 'findEventByTitle',
        reason: '조회 결과 값이 비어있습니다.(값이 없습니다.)',
      };
    }

    return {
      events: foundResult.events.map((event): IEvent => {
        return {
          exposure: event.eventExposure.value,
          title: event.eventTitle.value,
          description: event.eventDescription.value,
          startDate: event.eventStartDate.value,
          endDate: event.eventEndDate.value,
        };
      }),
    };
  }
}
