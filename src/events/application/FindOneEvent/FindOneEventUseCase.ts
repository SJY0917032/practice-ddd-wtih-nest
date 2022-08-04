import { Inject } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/UseCase/IUseCase';
import {
  EVENT_REPOSITORY,
  IEventRepository,
} from '../../infra/interface/IEventRepository';
import { FindOneEventUseCaseRequest } from './dto/FindOneEventUseCaseRequest';
import { FindOneEventUseCaseResponse } from './dto/FindOneEventUseCaseResponse';

export class FindOneEventUseCase
  implements IUseCase<FindOneEventUseCaseRequest, FindOneEventUseCaseResponse>
{
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(
    request?: FindOneEventUseCaseRequest,
  ): Promise<FindOneEventUseCaseResponse> {
    const { id } = request;

    const findEvent = await this.eventRepository.find(id);

    if (!findEvent) {
      return {
        code: 'NOTFOUND',
        event: undefined,
      };
    }

    return { code: 'SUCCESS', event: findEvent };
  }
}
