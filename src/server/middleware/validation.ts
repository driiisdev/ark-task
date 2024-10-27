import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required()
});

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const talkSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  eventId: Joi.string().required(),
  duration: Joi.number().required(),
  startTime: Joi.date().required(),
  tags: Joi.array().items(Joi.string()),
  maxAttendees: Joi.number()
});

export const validateTalk = (req: Request, res: Response, next: NextFunction) => {
  const { error } = talkSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string(),
  capacity: Joi.number(),
  isPublished: Joi.boolean()
});

export const speakerApplicationSchema = Joi.object({
  talkTitle: Joi.string().required(),
  talkDescription: Joi.string().required(),
  experience: Joi.string().required(),
  preferredDates: Joi.array().items(Joi.date())
});

export const validateEvent = validateSchema(eventSchema);
export const validateSpeakerApplication = validateSchema(speakerApplicationSchema);

function validateSchema(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
}
