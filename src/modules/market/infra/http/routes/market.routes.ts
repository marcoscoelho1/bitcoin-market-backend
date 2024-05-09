import { Router } from 'express';

import BitcoinQuoteController from '../contollers/BitcoinQuoteController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import PurchaseBitcoinController from '../contollers/PurchaseBitcoinController';
import { Joi, Segments, celebrate } from 'celebrate';
import BalanceBitcoinController from '../contollers/BalanceBitcoinController';
import SellBitcoinController from '../contollers/SellBitcoinController';
import TransfersController from '../contollers/TransfersController';

const marketRouter = Router();

const bitcoinQuoteController = new BitcoinQuoteController();
const purchaseBitcoinController = new PurchaseBitcoinController();
const balanceBitcoinController = new BalanceBitcoinController();
const sellBitcoinController = new SellBitcoinController();
const transfersController = new TransfersController();

marketRouter.get(
  '/bitcoin/quote',
  isAuthenticated,
  bitcoinQuoteController.index,
);

marketRouter.get(
  '/bitcoin/balance',
  isAuthenticated,
  balanceBitcoinController.index,
);

marketRouter.get('/transfers', isAuthenticated, transfersController.index);

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

marketRouter.post(
  '/bitcoin/sell',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().positive().required(),
    },
  }),
  sellBitcoinController.create,
);

export default marketRouter;
