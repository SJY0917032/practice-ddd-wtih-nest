import { CoreResponse } from '../../../../shared/core/Response/CoreResponse';
import { Event } from '../../../domain/Event';

export interface FindAllEventUseCaseResponse extends CoreResponse {
  events: Event[];
}
