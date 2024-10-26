export class CreateTalkDTO {
  title: string;
  description: string;
  speakerId: string;
  eventId: string;
  duration: number;
  startTime: Date;
  tags?: string[];
  maxAttendees?: number;
}

export class UpdateTalkDTO {
  title?: string;
  description?: string;
  duration?: number;
  startTime?: Date;
  tags?: string[];
  maxAttendees?: number;
}
