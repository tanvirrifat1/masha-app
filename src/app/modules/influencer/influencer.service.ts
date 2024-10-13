import { IInfluencer } from './influencer.interface';
import { Influencer } from './influencer.model';

const updateInfluencerToDB = async (
  id: string,
  payload: Partial<IInfluencer>
) => {
  const result = await Influencer.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const InfluencerService = {
  updateInfluencerToDB,
};
