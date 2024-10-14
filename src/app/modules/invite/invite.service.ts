import QueryBuilder from '../../builder/QueryBuilder';
import { IInvite } from './invite.interface';
import { Invite } from './invite.model';

const createInviteToDB = async (payload: Partial<IInvite>) => {
  const result = await Invite.create(payload);
  return result;
};

const getAllInvites = async (query: Record<string, unknown>) => {
  const inviteBuilder = new QueryBuilder(
    Invite.find()
      .populate({
        path: 'brand',
        populate: {
          path: 'brand',
        },
      })
      .populate('influencer'),
    query
  )
    .search(['brand', 'influencer'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await inviteBuilder.modelQuery;
  return result;
};

const updatedInviteToDB = async (id: string, payload: Partial<IInvite>) => {
  const result = await Invite.findByIdAndUpdate(
    id, // ID of the invite to update
    { status: payload.status }, // Only updating the 'status' field
    {
      new: true, // Returns the updated document instead of the original
      runValidators: true, // Runs schema validators during update
    }
  );
  return result;
};

export const InviteService = {
  createInviteToDB,
  getAllInvites,
  updatedInviteToDB,
};
