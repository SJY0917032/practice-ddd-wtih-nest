import { AggregateRoot } from '../../shared/core/AggregateRoot/AggregateRoot';
import { EventDescription } from './EventDescription';
import { EventExposure } from './EventExposure';
import { EventDate } from './EventDate';
import { EventTitle } from './EventTitle';
import { Result } from '../../shared/core/Result/Result';

interface EventProps {
  eventExposure: EventExposure;
  eventTitle: EventTitle;
  eventDescription: EventDescription;
  eventStartDate: EventDate;
  eventEndDate: EventDate;
  // Todo : EventBannerImage
  // Todo : EventImages
}

export class Event extends AggregateRoot<EventProps, string> {
  private constructor(props: EventProps, id?: string) {
    super(props, id);
  }

  static create(props: EventProps, id?: string): Result<Event> {
    if (props.eventStartDate.value > props.eventEndDate.value) {
      return Result.fail('EndDate must be Bigger than StartDate');
    }

    return Result.ok(new Event(props, id));
  }

  get eventExposure(): EventExposure {
    return this.props.eventExposure;
  }

  get eventTitle(): EventTitle {
    return this.props.eventTitle;
  }

  get eventDescription(): EventDescription {
    return this.props.eventDescription;
  }

  get eventStartDate(): EventDate {
    return this.props.eventStartDate;
  }

  get eventEndDate(): EventDate {
    return this.props.eventEndDate;
  }
}
