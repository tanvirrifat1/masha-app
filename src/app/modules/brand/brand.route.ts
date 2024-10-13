import express from 'express';
import { BrandController } from './brand.controller';

const router = express.Router();

router.patch('/:id', BrandController.updatedBrand);

export const BrandRoutes = router;
