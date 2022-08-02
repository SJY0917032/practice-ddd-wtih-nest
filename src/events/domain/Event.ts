import { AggregateRoot } from 'src/shared/core/AggregateRoot/AggregateRoot';
import { EventDescription } from './EventDesciption';
import { EventExposure } from './EventExposure';
import { EventTitle } from './EventTitle';

interface EventProps {
  eventExposure: EventExposure;
  eventTitle: EventTitle;
  eventDescription: EventDescription;
  eventStartDate: EventStartDate;
  eventEndDate: EventEndDate;
  // Todo : EventBannerImage
  // Todo : EventImages
  createdAt: Date;
}

export interface EventNewProps {
  eventExposure: EventExposure;
  eventTitle: EventTitle;
  eventDescription: EventDescription;
  eventStartDate: EventStartDate;
  eventEndDate: EventEndDate;
  // Todo : EventBannerImage
  // Todo : EventImages
}

// export class User extends AggregateRoot<
