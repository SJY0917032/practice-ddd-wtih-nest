import { isDate } from 'lodash';
import { Result } from '../../shared/core/Result/Result';
import { ValueObject } from '../../shared/core/ValueObject/ValueObject';
import dayjs from 'dayjs';

interface EventStartDateProps {
  value: Date;
}

export class EventStartDate extends ValueObject<EventStartDateProps> {
  static create(eventStartDateData: Date): Result<EventStartDate> {
    if (!isDate(eventStartDateData)) {
      return Result.fail('EventDate should be DateType');
    }

    const now = dayjs();

    if (now.isAfter(eventStartDateData)) {
      return Result.fail('EventData should be after now');
    }

    return Result.ok(new EventStartDate({ value: eventStartDateData }));
  }
}
