import { Result } from '../../shared/core/Result/Result';
import { EventDate } from './EventDate';

describe('Event Date', () => {
  const EVENT_DATE = new Date();
  const EVENT_DATE_MUST_DATE = 'EventDate should be DateType';

  let eventDateOrError: Result<EventDate>;

  it('생성', () => {
    eventDateOrError = EventDate.create(EVENT_DATE);
    expect(eventDateOrError.isSuccess).toBe(true);
    expect(eventDateOrError.isFailure).toBe(false);
  });

  it('Event Date값은 Date형태여야 한다.', () => {
    eventDateOrError = EventDate.create(null);

    expect(eventDateOrError.isSuccess).toBe(false);
    expect(eventDateOrError.isFailure).toBe(true);
    expect(eventDateOrError.errorValue()).toEqual(EVENT_DATE_MUST_DATE);
  });
});
