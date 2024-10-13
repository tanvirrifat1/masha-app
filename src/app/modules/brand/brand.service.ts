import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const updateBrandToDB = async (id: string, payload: Partial<IBrand>) => {
  const isBrandExist = await User.findOne({
    brand: id,
  });

  if (!isBrandExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Brand not found');
  }

  const result = await Brand.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const BrandService = {
  updateBrandToDB,
};
