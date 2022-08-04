import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/UseCase/IUseCase';
import {
  EVENT_REPOSITORY,
  IEventRepository,
} from '../../infra/interface/IEventRepository';
import { FindAllEventUseCAseRequest } from './dto/FindallEventUseCaseRequest';
import { FindAllEventUseCaseResponse } from './dto/FindAllEventUseCaseResponse';

@Injectable()
export class FindAllEventUseCase
  implements IUseCase<FindAllEventUseCAseRequest, FindAllEventUseCaseResponse>
{
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(): Promise<FindAllEventUseCaseResponse> {
    const events = await this.eventRepository.findAll();

    if (events === undefined) {
      return { code: 'NOTFOUND', events };
    }

    return { code: 'SUCCESS', events };
  }
}
