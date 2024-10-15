import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { inviteStatus } from './collaboration.constant';
import { ICollaboration } from './collaboration.interface';
import { Collaborate } from './collaboration.model';
import { Campaign } from '../campaign/campaign.model';

const createCollaborationToDB = async (payload: ICollaboration) => {
  const result = await Collaborate.create(payload);
  console.log(result);
  const updatedCampaign = await Campaign.findOneAndUpdate(
    { _id: result.campaign }, // Use the campaign's _id
    {
      $set: {
        typeStatus: 'Pending',
        influencer: result.influencer,
      },
    },
    { new: true }
  );
  if (!updatedCampaign) {
    return `Failed to update campaign with collaboration details`;
  }

  return result;
};

const getAllCollaborations = async (query: Record<string, unknown>) => {
  const collaborateBuilder = new QueryBuilder(
    Collaborate.find().populate('brand').populate('influencer'),
    query
  )
    .search(inviteStatus)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await collaborateBuilder.modelQuery;

  return result;
};

const updatedCollaborationToDB = async (
  id: string,
  payload: Partial<ICollaboration>
) => {
  if (payload.status === 'Pending') {
    payload.status = 'Accomplish';
  }

  // Update the collaboration status
  const result = await Collaborate.findByIdAndUpdate(
    id,
    { status: payload.status },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

export const CollaborationService = {
  createCollaborationToDB,
  getAllCollaborations,
  updatedCollaborationToDB,
};
