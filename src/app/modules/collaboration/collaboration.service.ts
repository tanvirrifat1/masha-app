import QueryBuilder from '../../builder/QueryBuilder';
import { inviteStatus } from './collaboration.constant';
import { ICollaboration } from './collaboration.interface';
import { Collaborate } from './collaboration.model';

const createCollaborationToDB = async (payload: ICollaboration) => {
  const result = await Collaborate.create(payload);
  return result;
};

const getAllCollaborations = async (query: Record<string, unknown>) => {
  const collaborateBuilder = new QueryBuilder(
    Collaborate.find().populate('brand').populate('influencer'),
    query
  )
    .search(inviteStatus)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await collaborateBuilder.modelQuery;

  return result;
};

export const CollaborationService = {
  createCollaborationToDB,
  getAllCollaborations,
};
