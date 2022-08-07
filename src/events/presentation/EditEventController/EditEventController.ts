import { Body, Controller, Patch } from '@nestjs/common';
import { CoreErrorResponse } from '../../../shared/core/Response/CoreErrorReponse';
import { EditEventUseCase } from '../../application/EditEvent/EditEventUseCase';
import { EditEventRequestBody } from './dto/EditEventRequestBody';
import { EditEventResponse } from './dto/EditEventResponse';

@Controller('event')
export class EditEventController {
  constructor(private readonly editEventUseCase: EditEventUseCase) {}

  @Patch()
  async edit(
    @Body() editEventRequestBody: EditEventRequestBody,
  ): Promise<EditEventResponse | CoreErrorResponse> {
    try {
      await this.editEventUseCase.execute({
        id: editEventRequestBody.id,
        exposure: editEventRequestBody.exposure,
        title: editEventRequestBody.title,
        description: editEventRequestBody.description,
        startDate: editEventRequestBody.startDate,
        endDate: editEventRequestBody.endDate,
      });
      return {
        code: 'SUCCESS',
        message: '성공적으로 이벤트를 수정했습니다.',
      };
    } catch (error) {
      return {
        code: 'FAIL',
        errorMessage: error.message,
      };
    }
  }
}
