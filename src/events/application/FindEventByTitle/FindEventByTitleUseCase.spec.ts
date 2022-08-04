import { mock, MockProxy } from 'jest-mock-extended';
import { Event } from '../../domain/Event';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventExposure } from '../../domain/EventExposure';
import { EventTitle } from '../../domain/EventTitle';
import { IEventRepository } from '../../infra/interface/IEventRepository';
import { FindEventByTitleUseCase } from './FindEventByTitleUseCase';

describe('FindEventByTitle', () => {
  let result: FindEventByTitleUseCase;
  let eventRepository: MockProxy<IEventRepository>;

  const foundEvent = [
    Event.create({
      eventExposure: EventExposure.create(true).value,
      eventTitle: EventTitle.create('t1').value,
      eventDescription: EventDescription.create('d1').value,
      eventStartDate: EventDate.create(new Date(2022, 8, 1)).value,
      eventEndDate: EventDate.create(new Date(2022, 8, 31)).value,
    }).value,
  ];

  const title = 't1';

  beforeEach(() => {
    eventRepository = mock<IEventRepository>();
    result = new FindEventByTitleUseCase(eventRepository);
    eventRepository.findByTitle
      .calledWith('t1')
      .mockResolvedValueOnce(foundEvent);
  });

  it('should have a execute defined', () => {
    expect(result.execute).toBeDefined();
  });

  it('should defined a repository and UseCase?', () => {
    expect(result).toBeDefined();
    expect(eventRepository).toBeDefined();
  });

  it('should called a repository.findByTitle?', async () => {
    const findEventByTitleUseCase = await result.execute({ title: title });

    expect(eventRepository.findByTitle).toBeCalledTimes(1);
  });

  it('NOT FOUND', async () => {
    const findEventByTitleUseCaseNOTFOUND = await result.execute({
      title: '잘못된제목',
    });
    expect(eventRepository.findByTitle).toBeCalledTimes(1);
    expect(findEventByTitleUseCaseNOTFOUND).toEqual({
      code: 'NOTFOUND',
      events: undefined,
    });
  });

  it('SUCCESS', async () => {
    const findEventByTitleUseCaseSUCCESS = await result.execute({
      title: title,
    });
    expect(eventRepository.findByTitle).toBeCalledTimes(1);
    expect(findEventByTitleUseCaseSUCCESS).toEqual({
      code: 'SUCCESS',
      events: foundEvent,
    });
  });
});
