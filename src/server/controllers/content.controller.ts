import { Request, Response } from 'express';
import { ContentService } from '@/services/content.service';

export class ContentController {
  private contentService: ContentService;

  constructor() {
    this.contentService = new ContentService();
  }

  public uploadPresentation = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }

      const { talkId } = req.body;
      const upload = await this.contentService.uploadPresentation(
        talkId,
        req.file,
        req.user.userId
      );

      res.status(201).json({
        success: true,
        data: upload
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public deleteUpload = async (req: Request, res: Response) => {
    try {
      await this.contentService.deleteUpload(req.params.id, req.user.userId);
      res.status(200).json({
        success: true,
        message: 'Upload deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public getResources = async (req: Request, res: Response) => {
    try {
      const resources = await this.contentService.getResources(req.query);
      res.status(200).json({
        success: true,
        data: resources
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public addResource = async (req: Request, res: Response) => {
    try {
      const resource = await this.contentService.addResource(req.body);
      res.status(201).json({
        success: true,
        data: resource
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public deleteResource = async (req: Request, res: Response) => {
    try {
      await this.contentService.deleteResource(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Resource deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
}
