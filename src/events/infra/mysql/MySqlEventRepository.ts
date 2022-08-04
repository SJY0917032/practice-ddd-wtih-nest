import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Event } from '../../domain/Event';
import { EventEntity } from '../entity/EventEntity';
import { IEventRepository } from '../interface/IEventRepository';
import { MySqlEventRepositoryMapper } from './mapper/MysqlEventRepositoryMapper';

export class MySqlEventRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async save(event: Event, id?: string): Promise<Event> {
    const upsertEvent = this.eventRepository.create({
      exposure: event.eventExposure.value,
      title: event.eventTitle.value,
      description: event.eventDescription.value,
      startDate: event.eventStartDate.value,
      endDate: event.eventEndDate.value,
    });

    if (id) {
      upsertEvent.id = id;
    }

    await this.eventRepository.save(upsertEvent);

    return event;
  }

  async find(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!event) {
      return undefined;
    }

    return MySqlEventRepositoryMapper.toDomain(event);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventRepository.find();

    if (!events) {
      return undefined;
    }

    return MySqlEventRepositoryMapper.toDomains(events);
  }

  async findByTitle(title: string): Promise<Event[]> {
    const events = await this.eventRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });

    if (!events) {
      return undefined;
    }

    return MySqlEventRepositoryMapper.toDomains(events);
  }
}
