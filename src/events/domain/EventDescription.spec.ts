import { Result } from '../../shared/core/Result/Result';
import { EventDescription } from './EventDesciption';

describe('Event Description', () => {
  const EVENT_DESCRIPTION = '쉰이나는 이벤트의 설명입니다.';
  const EVENT_DESCRIPTION_NOT_EMPTY = 'eventDescription should not be empty';

  let eventDescriptionOrError: Result<EventDescription>;

  beforeAll(() => {
    eventDescriptionOrError = EventDescription.create(EVENT_DESCRIPTION);
  });

  it('생성', () => {
    expect(eventDescriptionOrError.isSuccess).toBe(true);
    expect(eventDescriptionOrError.isFailure).toBe(false);
  });

  it('Event Description에는 빈 값이 올수 없다.', () => {
    eventDescriptionOrError = EventDescription.create('');

    expect(eventDescriptionOrError.isSuccess).toBe(false);
    expect(eventDescriptionOrError.isFailure).toBe(true);

    expect(eventDescriptionOrError.errorValue()).toEqual(
      EVENT_DESCRIPTION_NOT_EMPTY,
    );
  });

  it('Event Description에는 Nullish한 값이 올수 없다.', () => {
    eventDescriptionOrError = EventDescription.create(null);
    const eventDescriptionErrorToUndefined = EventDescription.create(undefined);

    expect(eventDescriptionOrError.isSuccess).toBe(false);
    expect(eventDescriptionErrorToUndefined.isSuccess).toBe(false);

    expect(eventDescriptionOrError.errorValue()).toEqual(
      EVENT_DESCRIPTION_NOT_EMPTY,
    );
    expect(eventDescriptionErrorToUndefined.errorValue()).toEqual(
      EVENT_DESCRIPTION_NOT_EMPTY,
    );
  });
});
