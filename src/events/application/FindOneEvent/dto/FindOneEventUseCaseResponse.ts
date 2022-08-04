import { CoreResponse } from '../../../../shared/core/Response/CoreResponse';
import { Event } from '../../../domain/Event';

export interface FindOneEventUseCaseResponse extends CoreResponse {
  event: Event;
}
