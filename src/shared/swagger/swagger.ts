import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

/**
 *
 * @description Swagger Setting File
 *
 */
export function setUpSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Practice-DDD')
    .setDescription('practice DDD With nest Rest API Docs')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}
