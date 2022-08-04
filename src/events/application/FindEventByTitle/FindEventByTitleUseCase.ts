import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/UseCase/IUseCase';
import {
  EVENT_REPOSITORY,
  IEventRepository,
} from '../../infra/interface/IEventRepository';
import { FindEventByTitleUseCaseRequest } from './dto/FindEventByTitleUseCaseRequest';
import { FindEventByTitleUseCaseResponse } from './dto/FindEventByTitleUseCaseResponse';

@Injectable()
export class FindEventByTitleUseCase
  implements
    IUseCase<FindEventByTitleUseCaseRequest, FindEventByTitleUseCaseResponse>
{
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(
    request?: FindEventByTitleUseCaseRequest,
  ): Promise<FindEventByTitleUseCaseResponse> {
    const { title } = request;

    const foundEvents = await this.eventRepository.findByTitle(title);

    if (!foundEvents) {
      return {
        code: 'NOTFOUND',
        events: undefined,
      };
    }

    return { code: 'SUCCESS', events: foundEvents };
  }
}
