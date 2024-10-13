import { User } from '../user/user.model';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const updateBrandToDB = async (id: string, payload: Partial<IBrand>) => {
  const result = await Brand.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const BrandService = {
  updateBrandToDB,
};
