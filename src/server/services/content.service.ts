import { Talk } from '@/models/talk.model';
import { Resource } from '@/models/resource.model';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface FileUpload {
  _id: string;
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  uploadedBy: string;
  talkId: string;
  createdAt: Date;
}

export class ContentService {
  private readonly uploadsDir = 'uploads/presentations';
  private readonly resourcesDir = 'uploads/resources';

  constructor() {
    // Ensure upload directories exist
    this.createDirectories();
  }

  private async createDirectories() {
    await fs.mkdir(this.uploadsDir, { recursive: true });
    await fs.mkdir(this.resourcesDir, { recursive: true });
  }

  public async uploadPresentation(talkId: string, file: Express.Multer.File, userId: string) {
    const talk = await Talk.findOne({ _id: talkId, speakerId: userId });
    if (!talk) {
      throw new Error('Talk not found or you are not authorized to upload to this talk');
    }

    const upload: FileUpload = {
      _id: uuidv4(),
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimeType: file.mimetype,
      uploadedBy: userId,
      talkId,
      createdAt: new Date()
    };

    // Store upload metadata in the talk
    talk.materials = talk.materials || [];
    talk.materials.push(upload._id);
    await talk.save();

    return upload;
  }

  public async deleteUpload(uploadId: string, userId: string) {
    const talk = await Talk.findOne({ materials: uploadId });
    if (!talk) {
      throw new Error('Upload not found');
    }

    if (talk.speakerId.toString() !== userId) {
      throw new Error('Not authorized to delete this upload');
    }

    // Remove file from filesystem
    const filePath = path.join(this.uploadsDir, uploadId);
    await fs.unlink(filePath);

    // Remove from talk materials
    talk.materials = talk.materials.filter(id => id !== uploadId);
    await talk.save();
  }

  public async getResources(query: any) {
    const { page = 1, limit = 10, type } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (type) filter.type = type;

    const resources = await Resource.find(filter)
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await Resource.countDocuments(filter);

    return {
      resources,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  public async addResource(resourceData: any) {
    const resource = new Resource({
      ...resourceData,
      _id: uuidv4()
    });

    if (resourceData.file) {
      const filename = `${resource._id}-${resourceData.file.originalname}`;
      const filePath = path.join(this.resourcesDir, filename);
      await fs.writeFile(filePath, resourceData.file.buffer);
      resource.filePath = filePath;
    }

    await resource.save();
    return resource;
  }

  public async deleteResource(resourceId: string) {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      throw new Error('Resource not found');
    }

    if (resource.filePath) {
      await fs.unlink(resource.filePath);
    }

    await resource.deleteOne();
  }

  // Additional helper methods for content management
  public async validateFileType(filename: string): Promise<boolean> {
    const allowedExtensions = ['.pdf', '.pptx', '.key', '.mp4', '.zip'];
    const ext = path.extname(filename).toLowerCase();
    return allowedExtensions.includes(ext);
  }

  public async generatePresignedUrl(fileId: string): Promise<string> {
    // Implementation would depend on your storage solution (S3, local, etc.)
    return `${process.env.BASE_URL}/uploads/presentations/${fileId}`;
  }
}
