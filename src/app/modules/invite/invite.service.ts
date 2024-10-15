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
        path: 'campaign',
        populate: {
          path: 'brand',
        },
      })
      .populate('influencer'),
    query
  )
    .search(['campaign', 'influencer'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await inviteBuilder.modelQuery;
  return result;
};

const updatedInviteToDB = async (id: string) => {
  // Retrieve the invite first
  const invite = await Invite.findById(id);

  console.log(invite);

  if (!invite) {
    throw new Error(`Invite with ID ${id} not found`);
  }

  // Now that you have the invite, you can use invite.influencer
  const result = await Invite.findByIdAndUpdate(
    id,
    {
      $set: {
        status: 'Accepted',
        // influencer: invite.influencer, // Use invite.influencer here
      },
    },
    { new: true }
  );

  return result;
};

export const InviteService = {
  createInviteToDB,
  getAllInvites,
  updatedInviteToDB,
};
