import express from 'express';
import { TermsAndConditionController } from './termsAndCondition.controller';

const router = express.Router();

router.post('/create-terms', TermsAndConditionController.createCategoryToDB);

export const TermsAndConditionRoutes = router;