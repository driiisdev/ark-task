import { Event } from '@/models/event.model';
import { Talk } from '@/models/talk.model';

export class EventService {
  public async createEvent(eventData: any) {
    const event = new Event(eventData);
    await event.save();
    return event;
  }

  public async getEventSchedule(eventId: string) {
    const event = await Event.findById(eventId);
    if (!event) throw new Error('Event not found');

    const talks = await Talk.find({ eventId })
      .populate('speaker', 'name email')
      .sort('startTime');

    return {
      event,
      schedule: talks
    };
  }

  // Additional service methods...
}
