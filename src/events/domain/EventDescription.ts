import { isEmpty } from 'lodash';
import { Result } from '../../shared/core/Result/Result';
import { ValueObject } from '../../shared/core/ValueObject/ValueObject';

interface EventDescriptionProps {
  value: string;
}

export class EventDescription extends ValueObject<EventDescriptionProps> {
  static create(eventDescriptionString: string): Result<EventDescription> {
    if (isEmpty(eventDescriptionString)) {
      return Result.fail('eventDescription should not be empty');
    }
    return Result.ok(new EventDescription({ value: eventDescriptionString }));
  }

  private constructor(props: EventDescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
