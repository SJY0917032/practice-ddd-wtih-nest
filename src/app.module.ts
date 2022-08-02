import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** Modules */
import { EventsModule } from './events/EventsModule';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'practice-db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'practice',
      entities: [__dirname + '/**/entity/*Entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      retryAttempts: 30,
      retryDelay: 5000,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
