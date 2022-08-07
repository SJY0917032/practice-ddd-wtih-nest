import { mock, MockProxy } from 'jest-mock-extended';
import { EditEventUseCase } from '../../application/EditEvent/EditEventUseCase';
import { EditEventController } from './EditEventController';
import { EditEventResponse } from './dto/EditEventResponse';
import { CoreErrorResponse } from '../../../shared/core/Response/CoreErrorReponse';
import { EditEventRequestBody } from './dto/EditEventRequestBody';

describe('EditEventController', () => {
  let editEventController: EditEventController;
  let editEventUseCase: MockProxy<EditEventUseCase>;

  const SUCCESS_MESSAGE: EditEventResponse = {
    code: 'SUCCESS',
    message: '성공적으로 이벤트를 수정했습니다.',
  };

  const ERROR_MESSAGE: CoreErrorResponse = {
    code: 'FAIL',
    errorMessage: undefined,
  };

  const mockEditEventRequestBody: EditEventRequestBody = {
    id: '1',
    exposure: true,
    title: 't1',
    description: 'd1',
    startDate: new Date(2022, 8, 1),
    endDate: new Date(2022, 8, 30),
  };

  beforeEach(() => {
    editEventUseCase = mock<EditEventUseCase>();
    editEventController = new EditEventController(editEventUseCase);
  });

  it('should be defined editEvent', async () => {
    expect(editEventController.edit).toBeDefined();
  });

  it('should be defined a EditEventUseCase?', () => {
    expect(editEventUseCase).toBeDefined();
  });

  it('if editEventUseCase.execute throws an error, should return an error response', async () => {
    editEventUseCase.execute.mockRejectedValueOnce(ERROR_MESSAGE);

    const response = await editEventController.edit(mockEditEventRequestBody);

    expect(response).toEqual(ERROR_MESSAGE);
  });

  it('if editEventUse.execute Success should return SUCCESS_MESSAGE?', async () => {
    const response = await editEventController.edit(mockEditEventRequestBody);

    expect(response).toEqual(SUCCESS_MESSAGE);
  });
});
