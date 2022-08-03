import { Result } from '../../shared/core/Result/Result';
import { EventExposure } from './EventExposure';

describe('EventExposure', () => {
  const EVENT_EXPOSURE = true;
  const EVENT_EXPOSURE_NOT_BOOLEAN = 'eventExposure should be boolean';

  let eventExposureOrError: Result<EventExposure>;

  it('생성', () => {
    eventExposureOrError = EventExposure.create(EVENT_EXPOSURE);
    expect(eventExposureOrError.isSuccess).toBe(true);
    expect(eventExposureOrError.isFailure).toBe(false);
  });

  it('Event Exposure값은 Boolean만 가능합니다.', () => {
    eventExposureOrError = EventExposure.create(null);

    expect(eventExposureOrError.isSuccess).toBe(false);
    expect(eventExposureOrError.isFailure).toBe(true);
    expect(eventExposureOrError.errorValue()).toEqual(
      EVENT_EXPOSURE_NOT_BOOLEAN,
    );
  });
});
