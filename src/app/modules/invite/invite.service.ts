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
      .populate({
        path: 'influencer',
        populate: {
          path: 'influencer',
        },
      }),
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

export const InviteService = {
  createInviteToDB,
  getAllInvites,
};
