import { isEmpty } from 'lodash';
import { Result } from '../../shared/core/Result/Result';
import { ValueObject } from '../../shared/core/ValueObject/ValueObject';

interface EventTitleProps {
  value: string;
}

export class EventTitle extends ValueObject<EventTitleProps> {
  static create(eventTitleString: string): Result<EventTitle> {
    if (isEmpty(eventTitleString)) {
      return Result.fail('eventTitle should not be empty');
    }

    return Result.ok(new EventTitle({ value: eventTitleString }));
  }

  private constructor(props: EventTitleProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}
