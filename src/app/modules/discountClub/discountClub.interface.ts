export type IDiscountClub = {
  image: string;
  name: string;
  price: string;
  discount: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'deleted';
};
