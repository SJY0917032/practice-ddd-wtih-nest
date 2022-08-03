import { isDate } from 'lodash';
import { Result } from '../../shared/core/Result/Result';
import { ValueObject } from '../../shared/core/ValueObject/ValueObject';

interface EventDateProps {
  value: Date;
}

export class EventDate extends ValueObject<EventDateProps> {
  static create(eventDateData: Date): Result<EventDate> {
    if (!isDate(eventDateData)) {
      return Result.fail('EventDate should be DateType');
    }

    return Result.ok(new EventDate({ value: eventDateData }));
  }

  private constructor(props: EventDateProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }
}
