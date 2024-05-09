import { Router } from 'express';

import BitcoinQuoteController from '../contollers/BitcoinQuoteController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import PurchaseBitcoinController from '../contollers/PurchaseBitcoinController';
import { Joi, Segments, celebrate } from 'celebrate';

const marketRouter = Router();

const bitcoinQuoteController = new BitcoinQuoteController();
const purchaseBitcoinController = new PurchaseBitcoinController();

marketRouter.get(
  '/bitcoin/quote',
  isAuthenticated,
  bitcoinQuoteController.index,
);

marketRouter.post(
  '/bitcoin/purchase',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().positive().required(),
    },
  }),
  purchaseBitcoinController.create,
);

export default marketRouter;
