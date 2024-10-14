import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { AdminRoutes } from '../app/modules/admin/admin.routes';
import { BrandRoutes } from '../app/modules/brand/brand.route';
import { InfluencerRoutes } from '../app/modules/influencer/influencer.route';
import { CategoryRoutes } from '../app/modules/category/category.route';
import { CampaignRoutes } from '../app/modules/campaign/campaign.route';
import { DiscountClubRoutes } from '../app/modules/discountClub/discountClub.route';
const router = express.Router();

const apiRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/admin', route: AdminRoutes },
  { path: '/brand', route: BrandRoutes },
  { path: '/influencer', route: InfluencerRoutes },
  { path: '/category', route: CategoryRoutes },
  { path: '/campaign', route: CampaignRoutes },
  { path: '/discount', route: DiscountClubRoutes },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
