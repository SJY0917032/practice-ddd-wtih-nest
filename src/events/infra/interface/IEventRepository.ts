import { Event } from '../../domain/Event';

export const EVENT_REPOSITORY = Symbol('EVENT_REPOSITORY');

export interface IEventRepository {
  save(event: Event, id?: string): Promise<Event>;

  find(id: string): Promise<Event> | undefined;

  findAll(): Promise<Event[]> | undefined;

  findByTitle(title: string): Promise<Event[]> | undefined;
}
