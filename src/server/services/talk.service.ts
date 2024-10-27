import { Talk } from '@/models/talk.model';
import { User } from '@/models/user.model';
import { CreateTalkDTO, UpdateTalkDTO } from '@/dtos/talk.dto';

export class TalkService {
  public async getAllTalks(query: any) {
    const { page = 1, limit = 10, ...filters } = query;
    const skip = (page - 1) * limit;

    const talks = await Talk.find(filters)
      .populate('speaker', 'name email')
      .populate('event', 'title date')
      .skip(skip)
      .limit(limit);

    const total = await Talk.countDocuments(filters);

    return {
      talks,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  public async createTalk(talkData: CreateTalkDTO, userId: string) {
    const speaker = await User.findById(userId);
    if (!speaker) {
      throw new Error('Speaker not found');
    }

    const talk = new Talk({
      ...talkData,
      speakerId: userId
    });

    await talk.save();
    return talk.populate('speaker event');
  }

  // Additional service methods...
}
