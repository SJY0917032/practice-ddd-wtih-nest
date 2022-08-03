import _ from 'lodash';
import { Event } from '../../../domain/Event';
import { EventDate } from '../../../domain/EventDate';
import { EventDescription } from '../../../domain/EventDescription';
import { EventExposure } from '../../../domain/EventExposure';
import { EventTitle } from '../../../domain/EventTitle';
import { EventEntity } from '../../entity/EventEntity';

export class MySqlEventRepositoryMapper {
  static toDomain(entity: EventEntity): Event {
    if (_.isNil(entity)) {
      return null;
    }

    return Event.create(
      {
        eventExposure: EventExposure.create(entity.exposure).value,
        eventTitle: EventTitle.create(entity.title).value,
        eventDescription: EventDescription.create(entity.description).value,
        eventStartDate: EventDate.create(entity.startDate).value,
        eventEndDate: EventDate.create(entity.endDate).value,
      },
      entity.id,
    ).value;
  }

  static toDomains(entities: EventEntity[]): Event[] {
    return entities.map((entity) => {
      return this.toDomain(entity);
    });
  }
}
