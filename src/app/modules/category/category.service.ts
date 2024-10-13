import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { CategorySearchAbleFields } from './category.constant';

const createCategiryToDB = async (payload: Partial<ICategory>) => {
  const isCategoryExist = await Category.findOne({
    categoryName: payload.categoryName,
  });

  if (isCategoryExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category already exist');
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async (query: Record<string, unknown>) => {
  const categoryBuilder = new QueryBuilder(Category.find(), query)
    .search(CategorySearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryBuilder.modelQuery;

  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryToDB = async (id: string, payload: Partial<ICategory>) => {
  const isCategoryExist = await Category.findOne({
    categoryName: payload.categoryName,
  });

  if (isCategoryExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category already exist');
  }

  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCategoryToDB = async (id: string) => {
  const result = await Category.findByIdAndUpdate(id, {
    status: 'delete',
    new: true,
    runValidators: true,
  });
  return result;
};

export const CategoryService = {
  createCategiryToDB,
  getAllCategory,
  getSingleCategory,
  updateCategoryToDB,
  deleteCategoryToDB,
};
