import { mock, MockProxy } from 'jest-mock-extended';
import { IEventRepository } from '../../infra/interface/IEventRepository';
import { FindAllEventUseCase } from './FindAllEventUseCase';

describe('FindAllEventUseCase', () => {
  let result: FindAllEventUseCase;
  let eventRepository: MockProxy<IEventRepository>;

  beforeEach(() => {
    eventRepository = mock<IEventRepository>();
    result = new FindAllEventUseCase(eventRepository);
  });

  it('defined?', () => {
    expect(result).toBeDefined();
  });

  it('전부 검색 - 있을시', async () => {
    eventRepository.findAll.mockResolvedValueOnce([]);
    const findAllEventUseCaseResponse = await result.execute();

    expect(findAllEventUseCaseResponse).toBeDefined();
    expect(findAllEventUseCaseResponse).toEqual({
      code: 'SUCCESS',
      events: [],
    });
  });

  it('전부 검색 - 없을시', async () => {
    const findAllEventUseCaseResponse = await result.execute();

    expect(findAllEventUseCaseResponse).toBeDefined();
    expect(findAllEventUseCaseResponse).toEqual({
      code: 'NOTFOUND',
      events: undefined,
    });
  });
});
