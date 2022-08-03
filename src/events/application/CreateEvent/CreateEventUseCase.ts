import { Inject } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { IUseCase } from '../../../shared/core/UseCase/IUseCase';
import { Event } from '../../domain/Event';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventExposure } from '../../domain/EventExposure';
import { EventTitle } from '../../domain/EventTitle';
import {
  EVENT_REPOSITORY,
  IEventRepository,
} from '../../infra/interface/IEventRepository';
import { CreateEventUseCaseRequest } from './dto/CreateEventUseCaseRequest';
import { CreateEventUseCaseResponse } from './dto/CreateEventUseCaseResponse';

export class CreateEventUseCase
  implements IUseCase<CreateEventUseCaseRequest, CreateEventUseCaseResponse>
{
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(
    request: CreateEventUseCaseRequest,
  ): Promise<CreateEventUseCaseResponse> {
    const { exposure, title, description, startDate, endDate } = request;

    const exposureOrError = EventExposure.create(exposure);
    const titleOrError = EventTitle.create(title);
    const descriptionOrError = EventDescription.create(description);
    const startDateOrError = EventDate.create(startDate);
    const endDateOrError = EventDate.create(endDate);

    const event = Event.create({
      eventExposure: exposureOrError.value,
      eventTitle: titleOrError.value,
      eventDescription: descriptionOrError.value,
      eventStartDate: startDateOrError.value,
      eventEndDate: endDateOrError.value,
    }).value;

    await this.eventRepository.save(event);

    return { code: 'SUCCESS' };
  }
}
