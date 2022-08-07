import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventUseCase } from '../../application/CreateEvent/CreateEventUseCase';
import { CreateEventRequestBody } from './dto/CreateEventRequestBody';
import { CoreErrorResponse } from '../../../shared/core/Response/CoreErrorReponse';
import { CreateEventResponse } from './dto/CreateEventResponse';

@Controller('event')
export class CreateEventController {
  constructor(private readonly createEventUseCase: CreateEventUseCase) {}

  @Post()
  async create(
    @Body() createEventRequestBody: CreateEventRequestBody,
  ): Promise<CreateEventResponse | CoreErrorResponse> {
    try {
      await this.createEventUseCase.execute({
        exposure: createEventRequestBody.exposure,
        title: createEventRequestBody.title,
        description: createEventRequestBody.description,
        startDate: createEventRequestBody.startDate,
        endDate: createEventRequestBody.endDate,
      });
      return {
        code: 'SUCCESS',
        message: '성공적으로 이벤트를 생성하였습니다.',
      };
    } catch (error) {
      return {
        code: 'FAIL',
        errorMessage: error.message,
      };
    }
  }
}
