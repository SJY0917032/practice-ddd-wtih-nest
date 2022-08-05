// Response
export interface IEvent {
  exposure: boolean;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export class FindAllResponse {
  events: IEvent[];
}
