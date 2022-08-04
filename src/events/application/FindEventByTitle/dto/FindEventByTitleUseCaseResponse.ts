import { CoreResponse } from '../../../../shared/core/Response/CoreResponse';
import { Event } from '../../../domain/Event';

export interface FindEventByTitleUseCaseResponse extends CoreResponse {
  events: Event[];
}
