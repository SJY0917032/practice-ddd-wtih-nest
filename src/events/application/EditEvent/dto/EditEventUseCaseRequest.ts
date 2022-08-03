export interface EditEventUseCaseRequest {
  id: string;
  exposure: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
