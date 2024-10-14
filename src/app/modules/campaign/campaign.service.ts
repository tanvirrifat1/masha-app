import { ICampaign } from './campaign.interface';
import { Campaign } from './campaign.model';

const createCampaignToDB = async (payload: Partial<ICampaign>) => {
  const campaign = await Campaign.create(payload);
  return campaign;
};

export const CampaignService = {
  createCampaignToDB,
};
