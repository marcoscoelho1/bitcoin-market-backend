import { Router } from 'express';

import BitcoinQuoteController from '../contollers/BitcoinQuoteController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const marketRouter = Router();

const bitcoinQuoteController = new BitcoinQuoteController();

marketRouter.get(
  '/bitcoin/quote',
  isAuthenticated,
  bitcoinQuoteController.index,
);

export default marketRouter;
