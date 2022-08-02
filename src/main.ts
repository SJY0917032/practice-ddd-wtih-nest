import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filter/httpExceptionFilter';
import { setUpSwagger } from './shared/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  setUpSwagger(app);
  await app.listen(3000);
}
bootstrap();
