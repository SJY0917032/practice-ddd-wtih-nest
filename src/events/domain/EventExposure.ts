import { isBoolean } from 'lodash';
import { Result } from '../../shared/core/Result/Result';
import { ValueObject } from '../../shared/core/ValueObject/ValueObject';

interface EventExposureProps {
  value: boolean;
}

export class EventExposure extends ValueObject<EventExposureProps> {
  static create(eventExposureBoolean: boolean): Result<EventExposure> {
    if (!isBoolean(eventExposureBoolean)) {
      return Result.fail('eventExposure should be boolean');
    }

    return Result.ok(new EventExposure({ value: eventExposureBoolean }));
  }

  private constructor(props: EventExposureProps) {
    super(props);
  }

  get value(): boolean {
    return this.props.value;
  }
}
