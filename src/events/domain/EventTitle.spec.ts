import { Result } from '../../shared/core/Result/Result';
import { EventTitle } from './EventTitle';

describe('EventTitle', () => {
  const EVENT_TITLE = '씐나는 이벤트';
  const EVENT_TITLE_EMPTY = 'eventTitle should not be empty';

  let eventTitleOrError: Result<EventTitle>;

  beforeAll(() => {
    eventTitleOrError = EventTitle.create(EVENT_TITLE);
  });

  it('생성', () => {
    expect(eventTitleOrError.isSuccess).toBe(true);
    expect(eventTitleOrError.isFailure).toBe(false);
  });

  it('Event Title은 빈값이 불가능하다.', () => {
    eventTitleOrError = EventTitle.create('');

    expect(eventTitleOrError.isSuccess).toBe(false);
    expect(eventTitleOrError.isFailure).toBe(true);
    expect(eventTitleOrError.errorValue()).toEqual(EVENT_TITLE_EMPTY);
  });

  it('Event Title은 Nullish한 값이 올수 없다.', () => {
    eventTitleOrError = EventTitle.create(null);
    const eventTitleErrorToUndefined = EventTitle.create(undefined);

    expect(eventTitleOrError.isSuccess).toBe(false);
    expect(eventTitleErrorToUndefined.isSuccess).toBe(false);
    expect(eventTitleOrError.errorValue()).toEqual(EVENT_TITLE_EMPTY);
    expect(eventTitleErrorToUndefined.errorValue()).toEqual(EVENT_TITLE_EMPTY);
  });
});
