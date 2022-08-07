import { mock, MockProxy } from 'jest-mock-extended';
import { CreateEventUseCase } from '../../application/CreateEvent/CreateEventUseCase';
import { CreateEventController } from './CreateEventController';
import { CreateEventResponse } from './dto/CreateEventResponse';
import { CoreErrorResponse } from '../../../shared/core/Response/CoreErrorReponse';
import { CreateEventRequestBody } from './dto/CreateEventRequestBody';

describe('CreateEventController', () => {
  let createEventController: CreateEventController;
  let createEventUseCase: MockProxy<CreateEventUseCase>;

  const SUCCESS_MESSAGE: CreateEventResponse = {
    code: 'SUCCESS',
    message: '성공적으로 이벤트를 생성하였습니다.',
  };

  const ERROR_MESSAGE: CoreErrorResponse = {
    code: 'FAIL',
    errorMessage: undefined,
  };

  const mockCreateEventRequestBody: CreateEventRequestBody = {
    exposure: true,
    title: 't1',
    description: 'd1',
    startDate: new Date(2022, 8, 1),
    endDate: new Date(2022, 8, 30),
  };

  beforeEach(() => {
    createEventUseCase = mock<CreateEventUseCase>();
    createEventController = new CreateEventController(createEventUseCase);
  });

  it('should be defined createEvent', async () => {
    expect(createEventController.create).toBeDefined();
  });

  it('should be defined a CreateEventUseCase?', () => {
    expect(createEventUseCase).toBeDefined();
  });

  it('if createEventUseCase.execute throws an error, should return an error response', async () => {
    createEventUseCase.execute.mockRejectedValueOnce(ERROR_MESSAGE);

    const response = await createEventController.create(
      mockCreateEventRequestBody,
    );

    expect(response).toEqual(ERROR_MESSAGE);
  });

  it('if createEventUse.execute Success should return SUCCESS_MESSAGE?', async () => {
    const response = await createEventController.create(
      mockCreateEventRequestBody,
    );

    expect(response).toEqual(SUCCESS_MESSAGE);
  });
});
