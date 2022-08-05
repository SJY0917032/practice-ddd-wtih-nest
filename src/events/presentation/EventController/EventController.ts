import { Controller, Get } from '@nestjs/common';
import { EmptyFoundResponse } from '../../../shared/core/Controller/EmptyFoundResponse';
import { FindAllEventUseCase } from '../../application/FindAllEvent/FindAllEventUseCase';
import { FindAllResponse, IEvent } from './dto/EventControllerResponse';

@Controller('Event')
export class EventController {
  constructor(private readonly findAllEventUseCase: FindAllEventUseCase) {}

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
}
