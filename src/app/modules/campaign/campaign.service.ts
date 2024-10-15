import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { CampaignSearchAbleFields } from './campaign.contant';
import { ICampaign } from './campaign.interface';
import { Campaign } from './campaign.model';
import { Collaborate } from '../collaboration/collaboration.model';

const createCampaignToDB = async (payload: Partial<ICampaign>) => {
  const campaign = await Campaign.create(payload);
  return campaign;
};

const getAllCampaigns = async (query: Record<string, unknown>) => {
  const campaignBuilder = new QueryBuilder(
    Campaign.find().populate('brand').populate('influencer'),
    query
  )
    .search(CampaignSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await campaignBuilder.modelQuery;
  return result;
};

const getSingleCmpaign = async (id: string) => {
  const result = await Campaign.findById(id);
  return result;
};

const updateCampaignToDB = async (id: string, payload: Partial<ICampaign>) => {
  const result = await Campaign.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletedCampaignToDB = async (id: string) => {
  const result = await Campaign.findByIdAndUpdate(
    id,
    { status: 'delete' },
    { new: true, runValidators: true }
  );
  return result;
};

// const updatedCampaignStatusToDB = async (
//   id: string,
//   payload: Partial<ICampaign>
// ) => {
//   const camapign = await Campaign.findById(id);

//   if (!camapign) {
//     throw new Error(`Campaign with ID ${id} not found`);
//   }

//   const collabrationSatusSatus = await Collaborate.findOneAndUpdate(
//     { campaign: camapign._id },
//     { status: 'Completed' },
//     { new: true }
//   );

//   if (!collabrationSatusSatus) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, 'Collaboration not found');
//   }

//   const result = await Campaign.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         typeStatus: 'Accepted',
//       },
//     },
//     { new: true }
//   );

//   return result;
// };

const updatedCampaignStatusToDB = async (
  id: string,
  payload: Partial<ICampaign>
) => {
  const campaign = await Campaign.findById(id);

  if (!campaign) {
    throw new Error(`Campaign with ID ${id} not found`);
  }

  // Check if the status is being set to "Accepted"
  if (payload.typeStatus === 'Accepted') {
    const collaborationStatus = await Collaborate.findOneAndUpdate(
      { campaign: campaign._id },
      { status: 'Completed' },
      { new: true }
    );

    if (!collaborationStatus) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Collaboration not found');
    }
  }

  // Update the campaign status (Accepted or Rejected)
  const result = await Campaign.findByIdAndUpdate(
    id,
    {
      $set: {
        typeStatus: payload.typeStatus,
      },
    },
    { new: true }
  );

  return result;
};

export const CampaignService = {
  createCampaignToDB,
  getAllCampaigns,
  getSingleCmpaign,
  updateCampaignToDB,
  deletedCampaignToDB,
  updatedCampaignStatusToDB,
};
