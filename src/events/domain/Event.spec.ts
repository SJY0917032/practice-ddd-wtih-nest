import { Result } from '../../shared/core/Result/Result';
import { Event } from './Event';
import { EventDate } from './EventDate';
import { EventDescription } from './EventDescription';
import { EventExposure } from './EventExposure';
import { EventTitle } from './EventTitle';

describe('Event', () => {
  const EXPOSURE = true;
  const TITLE = '신나는 이벤트';
  const DESCRIPTION = '신이나는 내용';
  const START = new Date(2022, 8, 3, 14, 0, 0);
  const END = new Date(2022, 8, 31, 23, 59, 59);

  const EVENT_END_DATE_MUST_BIGGER_START =
    'EndDate must be Bigger than StartDate';

  let eventOrError: Result<Event>;
  let eventExposure: EventExposure;
  let eventTitle: EventTitle;
  let eventDescription: EventDescription;
  let eventStartDate: EventDate;
  let eventEndDate: EventDate;

  beforeEach(() => {
    eventExposure = EventExposure.create(EXPOSURE).value;
    eventTitle = EventTitle.create(TITLE).value;
    eventDescription = EventDescription.create(DESCRIPTION).value;
    eventStartDate = EventDate.create(START).value;
    eventEndDate = EventDate.create(END).value;

    eventOrError = Event.createNew({
      eventExposure,
      eventTitle,
      eventDescription,
      eventStartDate,
      eventEndDate,
    });
  });

  it('생성', () => {
    expect(eventOrError.isSuccess).toBe(true);
    expect(eventOrError.isFailure).toBe(false);
  });

  it('시작일은 종료일보다 커야한다.', () => {
    eventStartDate = EventDate.create(END).value;
    eventEndDate = EventDate.create(START).value;

    eventOrError = Event.createNew({
      eventExposure,
      eventTitle,
      eventDescription,
      eventStartDate,
      eventEndDate,
    });

    expect(eventOrError.isSuccess).toBe(false);
    expect(eventOrError.isFailure).toBe(true);
    expect(eventOrError.errorValue()).toEqual(EVENT_END_DATE_MUST_BIGGER_START);
  });

  it('getter 작동 여부', () => {
    expect(eventOrError.value.eventExposure).toEqual(eventExposure);
    expect(eventOrError.value.eventExposure.value).toEqual(EXPOSURE);

    expect(eventOrError.value.eventTitle).toEqual(eventTitle);
    expect(eventOrError.value.eventTitle.value).toEqual(TITLE);

    expect(eventOrError.value.eventDescription).toEqual(eventDescription);
    expect(eventOrError.value.eventDescription.value).toEqual(DESCRIPTION);

    expect(eventOrError.value.eventStartDate).toEqual(eventStartDate);
    expect(eventOrError.value.eventStartDate.value).toEqual(START);

    expect(eventOrError.value.eventEndDate).toEqual(eventEndDate);
    expect(eventOrError.value.eventEndDate.value).toEqual(END);
  });
});
