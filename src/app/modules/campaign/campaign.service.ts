import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { CampaignSearchAbleFields } from './campaign.contant';
import { ICampaign } from './campaign.interface';
import { Campaign } from './campaign.model';

const createCampaignToDB = async (payload: Partial<ICampaign>) => {
  const campaign = await Campaign.create(payload);
  return campaign;
};

const getAllCampaigns = async (query: Record<string, unknown>) => {
  const campaignBuilder = new QueryBuilder(Campaign.find(), query)
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

export const CampaignService = {
  createCampaignToDB,
  getAllCampaigns,
  getSingleCmpaign,
  updateCampaignToDB,
  deletedCampaignToDB,
};
