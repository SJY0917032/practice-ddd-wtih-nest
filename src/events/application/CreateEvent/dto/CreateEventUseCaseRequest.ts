export interface CreateEventUseCaseRequest {
  exposure: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
