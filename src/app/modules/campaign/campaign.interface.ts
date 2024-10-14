export type IGender = 'male' | 'female' | 'other';

export type ICampaign = {
  image: string;
  name: string;
  startTime: string;
  endTime: string;
  address: string;
  gender: IGender;
  dressCode: string;
  details: string;
  brandInstagram: string;
  collaboration: number;
  rules?: string;
  exchange?: string;
  status: 'active' | 'deleted';
};
