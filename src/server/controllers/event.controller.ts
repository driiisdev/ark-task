import { Request, Response } from 'express';
import { EventService } from '@/services/event.service';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  public createEvent = async (req: Request, res: Response) => {
    try {
      const event = await this.eventService.createEvent(req.body);
      res.status(201).json({
        success: true,
        data: event
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public getEventSchedule = async (req: Request, res: Response) => {
    try {
      const schedule = await this.eventService.getEventSchedule(req.params.id);
      res.status(200).json({
        success: true,
        data: schedule
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Additional controller methods...
}
