import { Request, Response } from 'express';
import { SpeakerService } from '@/services/speaker.service';

export class SpeakerController {
  private speakerService: SpeakerService;

  constructor() {
    this.speakerService = new SpeakerService();
  }

  public applySpeaker = async (req: Request, res: Response) => {
    try {
      const application = await this.speakerService.createApplication(
        req.user.userId,
        req.body
      );
      res.status(201).json({
        success: true,
        data: application
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
