import { mock, MockProxy } from 'jest-mock-extended';
import { FindAllEventUseCase } from '../../application/FindAllEvent/FindAllEventUseCase';
import { Event } from '../../domain/Event';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventExposure } from '../../domain/EventExposure';
import { EventTitle } from '../../domain/EventTitle';
import { EventController } from './EventController';
import { FindOneEventUseCase } from '../../application/FindOneEvent/FindOneEventUseCase';
import { FindEventByTitleUseCase } from '../../application/FindEventByTitle/FindEventByTitleUseCase';

describe('EventController', () => {
  let eventController: EventController;
  let findAllEventUseCase: MockProxy<FindAllEventUseCase>;
  let findOneEventUseCase: MockProxy<FindOneEventUseCase>;
  let findEventByTitleUseCase: MockProxy<FindEventByTitleUseCase>;

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
    findOneEventUseCase = mock<FindOneEventUseCase>();
    findEventByTitleUseCase = mock<FindEventByTitleUseCase>();
    eventController = new EventController(
      findAllEventUseCase,
      findOneEventUseCase,
      findEventByTitleUseCase,
    );
  });

  it('should be defined findAll', async () => {
    expect(eventController.findAll).toBeDefined();
  });

  it('should be defined findOne', async () => {
    expect(eventController.findOne).toBeDefined();
  });

  it('should be defined findEventByTitle', async () => {
    expect(eventController.findEventByTitle).toBeDefined();
  });

  it('should be defined a FindAllUseCase?', () => {
    expect(findAllEventUseCase).toBeDefined();
  });

  it('should be defined a FindOneUseCase?', () => {
    expect(findOneEventUseCase).toBeDefined();
  });

  it('should be defined a FindEventByTitleUseCase?', () => {
    expect(findEventByTitleUseCase).toBeDefined();
  });

  it('should called a FindAllUseCase.execute?', async () => {
    findAllEventUseCase.execute.mockResolvedValueOnce({
      code: 'SUCCESS',
      events: [],
    });
    await eventController.findAll();

    expect(findAllEventUseCase.execute).toBeCalledTimes(1);
  });

  it('should called a FindOneUseCase.execute?', async () => {
    findOneEventUseCase.execute.mockResolvedValueOnce({
      code: 'SUCCESS',
      event: foundEvent[0],
    });
    await eventController.findOne('1');
    expect(findOneEventUseCase.execute).toBeCalledTimes(1);
  });

  it('should called a FindEventByTitleUseCase.execute?', async () => {
    findEventByTitleUseCase.execute.mockResolvedValueOnce({
      code: 'SUCCESS',
      events: foundEvent,
    });
    await eventController.findEventByTitle('t1');
    expect(findEventByTitleUseCase.execute).toBeCalledTimes(1);
  });

  it('if FindAll.execute NOTFOUND should be Exception Error?', async () => {
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

  it('if FindOne.execute NOTFOUND should be Exception Error?', async () => {
    findOneEventUseCase.execute.mockResolvedValueOnce({
      code: 'NOTFOUND',
      event: undefined,
    }); // 조회 결과 값이 비어있습니다.(값이 없습니다.)
    const FindOne = await eventController.findOne('1');

    expect(FindOne).toEqual({
      useCase: 'findOne',
      reason: '조회 결과 값이 비어있습니다.(값이 없습니다.)',
    });
  });

  it('if FindEventByTitle.execute NOTFOUND should be Exception Error?', async () => {
    findEventByTitleUseCase.execute.mockResolvedValueOnce({
      code: 'NOTFOUND',
      events: undefined,
    }); // 조회 결과 값이 비어있습니다.(값이 없습니다.)
    const FindEventByTitle = await eventController.findEventByTitle('ERROR!');
    expect(FindEventByTitle).toEqual({
      useCase: 'findEventByTitle',
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

  it('if execute SUCCESS should be return FindOneResponse?', async () => {
    findOneEventUseCase.execute.mockResolvedValueOnce({
      code: 'SUCCESS',
      event: foundEvent[0],
    });

    const FindOne = await eventController.findOne('1');

    expect(FindOne).toEqual({
      event: {
        exposure: foundEvent[0].eventExposure.value,
        title: foundEvent[0].eventTitle.value,
        description: foundEvent[0].eventDescription.value,
        startDate: foundEvent[0].eventStartDate.value,
        endDate: foundEvent[0].eventEndDate.value,
      },
    });
  });
});
