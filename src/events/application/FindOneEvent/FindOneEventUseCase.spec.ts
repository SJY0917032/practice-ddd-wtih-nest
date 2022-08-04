import { mock, MockProxy } from 'jest-mock-extended';
import { Event } from '../../domain/Event';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventExposure } from '../../domain/EventExposure';
import { EventTitle } from '../../domain/EventTitle';
import { IEventRepository } from '../../infra/interface/IEventRepository';
import { FindOneEventUseCase } from './FindOneEventUseCase';

describe('FindOneEventUseCase', () => {
  const id = '1';

  let result: FindOneEventUseCase;
  let eventRepository: MockProxy<IEventRepository>;

  beforeEach(() => {
    eventRepository = mock<IEventRepository>();
    result = new FindOneEventUseCase(eventRepository);
  });

  it('defined?', () => {
    expect(result).toBeDefined();
  });

  it('검색 - 없을시', async () => {
    eventRepository.find.calledWith('2').mockResolvedValueOnce(undefined);
    const findOneEventUseCaseResponse = await result.execute({ id: '2' });

    expect(findOneEventUseCaseResponse).toBeDefined();
    expect(findOneEventUseCaseResponse).toEqual({
      code: 'NOTFOUND',
      event: undefined,
    });
  });

  it('검색 - 있을시', async () => {
    const foundEvent = Event.create({
      eventExposure: EventExposure.create(true).value,
      eventTitle: EventTitle.create('t1').value,
      eventDescription: EventDescription.create('d1').value,
      eventStartDate: EventDate.create(new Date(2022, 8, 1)).value,
      eventEndDate: EventDate.create(new Date(2022, 8, 31)).value,
    }).value;
    eventRepository.find.calledWith('1').mockResolvedValueOnce(foundEvent);

    const findOneEventUseCaseResponse = await result.execute({ id: id });

    expect(findOneEventUseCaseResponse).toBeDefined();
    expect(findOneEventUseCaseResponse).toEqual({
      code: 'SUCCESS',
      event: foundEvent,
    });
  });
});
