import { Inject, Injectable } from '@nestjs/common';
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
import { EditEventUseCaseRequest } from './dto/EditEventUseCaseRequest';
import { EditEventUseCaseResponse } from './dto/EditEventUseCaseResponse';

@Injectable()
export class EditEventUseCase
  implements IUseCase<EditEventUseCaseRequest, EditEventUseCaseResponse>
{
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(
    request: EditEventUseCaseRequest,
  ): Promise<EditEventUseCaseResponse> {
    const { id, exposure, title, description, startDate, endDate } = request;

    try {
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

      await this.eventRepository.save(event, id);

      return {
        id: id,
        code: 'SUCCESS',
      };
    } catch (error) {
      return {
        id: id,
        code: '수정중 에러가 발생했습니다.',
      };
    }
  }
}
