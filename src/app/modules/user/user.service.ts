import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { startSession } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';

import { IUser } from './user.interface';
import { User } from './user.model';
import { IBrand } from '../brand/brand.interface';
import { Brand } from '../brand/brand.model';

const createBrandToDB = async (payload: Partial<IUser & IBrand>) => {
  const session = await startSession();

  try {
    session.startTransaction();

    // Set role and extract necessary fields
    payload.role = USER_ROLES.BRAND;

    // Create provider and user
    const [brand] = await Brand.create([{ email: payload.email }], { session });
    if (!brand) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create provider');
    }

    payload.brand = brand._id;
    const [user] = await User.create([payload], { session });
    if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    // Generate OTP and prepare email
    const otp = generateOTP();
    const emailValues = {
      name: user?.fullName,
      email: user.email,
      otp: otp,
    };
    const accountEmailTemplate = emailTemplate.createAccount(emailValues);
    emailHelper.sendEmail(accountEmailTemplate);

    // Update user with authentication details
    const authentication = {
      oneTimeCode: otp,
      expireAt: new Date(Date.now() + 3 * 60000),
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { authentication } },
      { session } // `new: true` returns the updated document
    );

    if (!updatedUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found for update');
    }

    // Commit transaction
    await session.commitTransaction();
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    throw error;
  } finally {
    // Ensure session ends regardless of success or failure
    await session.endSession();
  }
};

// const createEmployerToDB = async (payload: Partial<IUser & IEmployer>) => {
//   const session = await startSession();

//   try {
//     session.startTransaction();

//     // Set role and extract necessary fields
//     payload.role = USER_ROLES.EMPLOYER;

//     // Create provider and user
//     const [employer] = await Employer.create([{ rating: 0 }], { session });
//     if (!employer) {
//       throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create provider');
//     }

//     payload.employer = employer._id;
//     const [user] = await User.create([payload], { session });
//     if (!user) {
//       throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
//     }

//     // Generate OTP and prepare email
//     const otp = generateOTP();
//     const emailValues = {
//       name: user.firstName,
//       otp,
//       email: user.email,
//     };
//     const accountEmailTemplate = emailTemplate.createAccount(emailValues);
//     emailHelper.sendEmail(accountEmailTemplate);

//     // Update user with authentication details
//     const authentication = {
//       oneTimeCode: otp,
//       expireAt: new Date(Date.now() + 3 * 60000),
//     };
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: user._id },
//       { $set: { authentication } },
//       { session } // `new: true` returns the updated document
//     );

//     if (!updatedUser) {
//       throw new ApiError(StatusCodes.NOT_FOUND, 'User not found for update');
//     }

//     // Commit transaction
//     await session.commitTransaction();
//   } catch (error) {
//     // Abort transaction on error
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     // Ensure session ends regardless of success or failure
//     await session.endSession();
//   }
// };

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.findById(id).populate('provider employer');
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

export const UserService = {
  createBrandToDB,
  getUserProfileFromDB,
  updateProfileToDB,
};
