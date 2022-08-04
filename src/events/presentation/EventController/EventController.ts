import { Controller, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FindAllEventUseCase } from '../../application/FindAllEvent/FindAllEventUseCase';

@Controller('Event')
export class EventController {
  constructor(private readonly findAllEventUseCase: FindAllEventUseCase) {}

  async findAll(@Req() request: Request, @Res() response: Response) {
    const foundResult = await this.findAllEventUseCase.execute();

    if (foundResult.code === 'NOTFOUND') {
      response.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
