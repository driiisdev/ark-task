import { User } from '@/models/user.model';
import { Role } from '@/models/role.model';
import { SpeakerRequest } from '@/models/speakerRequest.model';
import { Talk } from '@/models/talk.model';

export class SpeakerService {
  public async createApplication(userId: string, applicationData: any) {
    const existingApplication = await SpeakerRequest.findOne({
      userId,
      approvalStatus: 'pending'
    });

    if (existingApplication) {
      throw new Error('You already have a pending speaker application');
    }

    const application = new SpeakerRequest({
      userId,
      ...applicationData
    });

    await application.save();
    return application.populate('applicant');
  }

  public async getApplications(query: any) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) filter.approvalStatus = status;

    const applications = await SpeakerRequest.find(filter)
      .populate('applicant', 'name email')
      .populate('reviewer', 'name email')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await SpeakerRequest.countDocuments(filter);

    return {
      applications,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  public async approveSpeaker(applicationId: string, adminId: string) {
    const application = await SpeakerRequest.findById(applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    if (application.approvalStatus !== 'pending') {
      throw new Error('Application has already been processed');
    }

    const speakerRole = await Role.findOne({ roleName: 'speaker' });
    if (!speakerRole) {
      throw new Error('Speaker role not found');
    }

    // Update user role to speaker
    await User.findByIdAndUpdate(application.userId, {
      roleId: speakerRole._id
    });

    // Update application status
    application.approvalStatus = 'approved';
    application.reviewedBy = adminId;
    application.reviewedAt = new Date();
    await application.save();

    return application.populate(['applicant', 'reviewer']);
  }

  public async getSpeakerProfile(speakerId: string) {
    const speaker = await User.findOne({
      _id: speakerId,
      roleId: await Role.findOne({ roleName: 'speaker' })
    }).select('-password');

    if (!speaker) {
      throw new Error('Speaker not found');
    }

    // Get speaker's talks
    const talks = await Talk.find({ speakerId })
      .populate('event', 'title date')
      .sort('-startTime');

    // Get speaking history
    const speakingHistory = await this.getSpeakerStats(speakerId);

    return {
      profile: speaker,
      talks,
      statistics: speakingHistory
    };
  }

  private async getSpeakerStats(speakerId: string) {
    const talks = await Talk.find({ speakerId });
    const talkIds = talks.map(talk => talk._id);

    const [totalAttendees, averageRating] = await Promise.all([
      this.calculateTotalAttendees(talkIds),
      this.calculateAverageRating(talkIds)
    ]);

    return {
      totalTalks: talks.length,
      upcomingTalks: talks.filter(talk => talk.startTime > new Date()).length,
      completedTalks: talks.filter(talk => talk.startTime <= new Date()).length,
      totalAttendees,
      averageRating: averageRating.toFixed(1)
    };
  }

  private async calculateTotalAttendees(talkIds: string[]) {
    const result = await Talk.aggregate([
      { $match: { _id: { $in: talkIds } } },
      {
        $lookup: {
          from: 'attendees',
          localField: '_id',
          foreignField: 'talkId',
          as: 'attendees'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $size: '$attendees' } }
        }
      }
    ]);

    return result[0]?.total || 0;
  }

  private async calculateAverageRating(talkIds: string[]) {
    const result = await Talk.aggregate([
      { $match: { _id: { $in: talkIds } } },
      {
        $lookup: {
          from: 'attendees',
          localField: '_id',
          foreignField: 'talkId',
          as: 'attendees'
        }
      },
      {
        $unwind: '$attendees'
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$attendees.rating' }
        }
      }
    ]);

    return result[0]?.averageRating || 0;
  }
}
