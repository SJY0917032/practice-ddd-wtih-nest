import { mock, MockProxy } from 'jest-mock-extended';
import { IEventRepository } from '../../infra/interface/IEventRepository';
import { CreateEventUseCase } from './CreateEventUseCase';

describe('CreateEventUseCase', () => {
  const EVENT_EXPOSURE = true;
  const EVENT_TITLE = '신나는이벤트';
  const EVENT_DESCRIPTION = '설명';
  const EVENT_STARTDATE = new Date(2022, 8, 3, 22, 1, 1);
  const EVENT_ENDDATE = new Date(2022, 8, 25, 22, 1, 1);

  let result: CreateEventUseCase;
  let eventRepository: MockProxy<IEventRepository>;

  beforeEach(() => {
    eventRepository = mock<IEventRepository>();
    result = new CreateEventUseCase(eventRepository);
  });

  it('defined?', () => {
    expect(result).toBeDefined();
  });

  it('이벤트 생성', async () => {
    const createEventUseCaseResponse = await result.execute({
      exposure: EVENT_EXPOSURE,
      title: EVENT_TITLE,
      description: EVENT_DESCRIPTION,
      startDate: EVENT_STARTDATE,
      endDate: EVENT_ENDDATE,
    });

    expect(createEventUseCaseResponse).toBeDefined();
    expect(createEventUseCaseResponse).toEqual({ code: 'SUCCESS' });
  });
});
