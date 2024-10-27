import { Request, Response } from 'express';
import { TalkService } from '@/services/talk.service';
import { CreateTalkDTO, UpdateTalkDTO } from '@/dtos/talk.dto';

export class TalkController {
  private talkService: TalkService;

  constructor() {
    this.talkService = new TalkService();
  }

  public getAllTalks = async (req: Request, res: Response) => {
    try {
      const talks = await this.talkService.getAllTalks(req.query);
      res.status(200).json({
        success: true,
        data: talks
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public createTalk = async (req: Request, res: Response) => {
    try {
      const talkData: CreateTalkDTO = req.body;
      const talk = await this.talkService.createTalk(talkData, req.user.userId);
      res.status(201).json({
        success: true,
        data: talk
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
