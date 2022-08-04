import { mock, MockProxy } from 'jest-mock-extended';
import { Request, Response } from 'express';
import { FindAllEventUseCase } from '../../application/FindAllEvent/FindAllEventUseCase';
import { EventController } from './EventController';

describe('EventController - FindAllEventUseCase', () => {
  let eventController: EventController;
  let findAllEventUseCase: MockProxy<FindAllEventUseCase>;
  let req: MockProxy<Request>;
  let res: MockProxy<Response>;

  beforeEach(() => {
    findAllEventUseCase = mock<FindAllEventUseCase>();
    eventController = new EventController(findAllEventUseCase);
    req = mock<Request>();
    res = mock<Response>();
  });

  it('should be defined findAll', async () => {
    expect(eventController.findAll).toBeDefined();
  });

  it('should be defined a UseCase?', () => {
    expect(findAllEventUseCase).toBeDefined();
  });

  it('should called a useCase.execute?', async () => {
    findAllEventUseCase.execute.mockResolvedValueOnce({
      code: 'NOTFOUND',
      events: undefined,
    });
    const findAllController = await eventController.findAll(req, res);

    expect(findAllEventUseCase.execute).toBeCalledTimes(1);
  });
});
