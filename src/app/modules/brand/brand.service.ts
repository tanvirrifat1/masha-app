import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';
import { USER_ROLES } from '../../../enums/user';
import QueryBuilder from '../../builder/QueryBuilder';
import { brandSearchAbleFields } from './brand.constant';

const updateBrandToDB = async (id: string, payload: Partial<IBrand>) => {
  // const isBrandExist = await User.findOne({
  //   brand: id,
  // });

  // console.log(isBrandExist);

  // if (!isBrandExist) {
  //   throw new ApiError(StatusCodes.NOT_FOUND, 'Brand not found');
  // }

  const result = await Brand.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllBrands = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(Brand.find().populate('category'), query)
    .search(brandSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await brandQuery.modelQuery;

  return result;
};

export const BrandService = {
  updateBrandToDB,
  getAllBrands,
};
