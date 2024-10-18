import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { inviteStatus } from './collaboration.constant';
import { ICollaboration } from './collaboration.interface';
import { Collaborate } from './collaboration.model';
import { Campaign } from '../campaign/campaign.model';
import { Interest } from '../interest_influencer/interest.model';

const createCollaborationToDB = async (payload: ICollaboration) => {
  const result = await Collaborate.create(payload);

  // const updatedCampaign = await Campaign.findOneAndUpdate(
  //   { _id: result.campaign },
  //   {
  //     $set: {
  //       typeStatus: 'Pending',
  //       influencer: result.influencer,
  //     },
  //   },
  //   { new: true }
  // );
  // if (!updatedCampaign) {
  //   return `Failed to update campaign with collaboration details`;
  // }

  console.log(result);

  const createInterestInfluencer = await Interest.create({
    campaign: result.campaign,
    influencer: result.influencer,
    Collaborate: result._id,
  });

  if (!createInterestInfluencer) {
    return `Failed to create interest with collaboration details`;
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
  // Update the collaboration status
  const result = await Collaborate.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// const updatedCollaborationToDB = async (
//   id: string,
//   payload: Partial<ICollaboration>
// ) => {
//   // Update the collaboration status
//   const result = await Collaborate.findByIdAndUpdate(
//     id,
//     { status: payload.status },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   return result;
// };

export const CollaborationService = {
  createCollaborationToDB,
  getAllCollaborations,
  updatedCollaborationToDB,
};
