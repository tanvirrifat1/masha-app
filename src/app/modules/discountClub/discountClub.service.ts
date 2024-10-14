import QueryBuilder from '../../builder/QueryBuilder';
import { DiscountSearchAbleFields } from './discountClub.constant';
import { IDiscountClub } from './discountClub.interface';
import { DiscountClub } from './discountClub.model';

const createDiscountToDB = async (payload: Partial<IDiscountClub>) => {
  const campaign = await DiscountClub.create(payload);
  return campaign;
};

const getAllDiscount = async (query: Record<string, unknown>) => {
  const discountBuilder = new QueryBuilder(DiscountClub.find(), query)
    .search(DiscountSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await discountBuilder.modelQuery;
  return result;
};

const getSingleDiscount = async (id: string) => {
  const result = await DiscountClub.findById(id);
  return result;
};

// const updateCampaignToDB = async (id: string, payload: Partial<ICampaign>) => {
//   const result = await Campaign.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

// const deletedCampaignToDB = async (id: string) => {
//   const result = await Campaign.findByIdAndUpdate(
//     id,
//     { status: 'delete' },
//     { new: true, runValidators: true }
//   );
//   return result;
// };

export const DiscountClubService = {
  createDiscountToDB,
  getAllDiscount,
  getSingleDiscount,
};
