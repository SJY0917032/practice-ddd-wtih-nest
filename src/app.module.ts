import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** Modules */
import { EventsModule } from './events/EventsModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'practice-database',
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
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
