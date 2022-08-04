import { mock, MockProxy } from 'jest-mock-extended';
import { IEventRepository } from '../../infra/interface/IEventRepository';
import { EditEventUseCase } from './EditEventUseCase';

describe('EditEventUseCase', () => {
  const id = '1';
  const EVENT_EXPOSURE = false;
  const EVENT_TITLE = '신나는 이벤트';
  const EVENT_DESCRIPTION = '설명';
  const EVENT_STARTDATE = new Date(2022, 8, 4, 1, 1, 1);
  const EVENT_ENDDATE = new Date(2022, 8, 5, 1, 1, 1);

  let result: EditEventUseCase;
  let eventRepository: MockProxy<IEventRepository>;

  beforeEach(() => {
    eventRepository = mock<IEventRepository>();
    result = new EditEventUseCase(eventRepository);
  });

  it('defined?', () => {
    expect(result).toBeDefined();
  });

  it('이벤트 수정', async () => {
    const editEventUseCaseResponse = await result.execute({
      id: id,
      exposure: EVENT_EXPOSURE,
      title: EVENT_TITLE,
      description: EVENT_DESCRIPTION,
      startDate: EVENT_STARTDATE,
      endDate: EVENT_ENDDATE,
    });

    expect(editEventUseCaseResponse).toBeDefined();
    expect(editEventUseCaseResponse).toEqual({ id: '1', code: 'SUCCESS' });
  });

  it('수정중 에러 발생', async () => {
    const editEventUseCaseErrorResponse = await result.execute({
      id: id,
      exposure: null,
      title: EVENT_TITLE,
      description: EVENT_DESCRIPTION,
      startDate: EVENT_STARTDATE,
      endDate: EVENT_ENDDATE,
    });

    expect(editEventUseCaseErrorResponse).toBeDefined();
    expect(editEventUseCaseErrorResponse).toEqual({
      id: '1',
      code: '수정중 에러가 발생했습니다.',
    });
  });
});
