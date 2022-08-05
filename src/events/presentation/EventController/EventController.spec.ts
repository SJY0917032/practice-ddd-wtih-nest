import { mock, MockProxy } from 'jest-mock-extended';
import { FindAllEventUseCase } from '../../application/FindAllEvent/FindAllEventUseCase';
import { Event } from '../../domain/Event';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventExposure } from '../../domain/EventExposure';
import { EventTitle } from '../../domain/EventTitle';
import { EventController } from './EventController';

describe('EventController - FindAllEventUseCase', () => {
  let eventController: EventController;
  let findAllEventUseCase: MockProxy<FindAllEventUseCase>;

  const foundEvent = [
    Event.create({
      eventExposure: EventExposure.create(true).value,
      eventTitle: EventTitle.create('t1').value,
      eventDescription: EventDescription.create('d1').value,
      eventStartDate: EventDate.create(new Date(2022, 8, 1)).value,
      eventEndDate: EventDate.create(new Date(2022, 8, 31)).value,
    }).value,
  ];

  beforeEach(() => {
    findAllEventUseCase = mock<FindAllEventUseCase>();
    eventController = new EventController(findAllEventUseCase);
  });

  it('should be defined findAll', async () => {
    expect(eventController.findAll).toBeDefined();
  });

  it('should be defined a UseCase?', () => {
    expect(findAllEventUseCase).toBeDefined();
  });

  it('should called a useCase.execute?', async () => {
    findAllEventUseCase.execute.mockResolvedValueOnce({
      code: 'SUCCESS',
      events: [],
    });
    await eventController.findAll();

    expect(findAllEventUseCase.execute).toBeCalledTimes(1);
  });

  it('if execute NOTFOUND should be Exception Error?', async () => {
    findAllEventUseCase.execute.mockResolvedValueOnce({
      code: 'NOTFOUND',
      events: undefined,
    });

    const FindAll = await eventController.findAll();

    expect(FindAll).toEqual({
      useCase: 'findAll',
      reason: '조회 결과 값이 비어있습니다.(값이 없습니다.)',
    });
  });

  it('if execute SUCCESS should be return FindAllResponse?', async () => {
    findAllEventUseCase.execute.mockResolvedValueOnce({
      code: 'SUCCESS',
      events: foundEvent,
    });

    const FindAll = await eventController.findAll();

    expect(FindAll).toEqual({
      events: [
        {
          exposure: foundEvent[0].eventExposure.value,
          title: foundEvent[0].eventTitle.value,
          description: foundEvent[0].eventDescription.value,
          startDate: foundEvent[0].eventStartDate.value,
          endDate: foundEvent[0].eventEndDate.value,
        },
      ],
    });
  });
});
