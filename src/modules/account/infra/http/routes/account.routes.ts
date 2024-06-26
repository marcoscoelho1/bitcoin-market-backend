import { Router } from 'express';

import AccountController from '../controllers/AccountController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import BalanceController from '../controllers/BalanceController';

const accountController = new AccountController();
const balanceController = new BalanceController();

const accountRouter = Router();

accountRouter.post(
  '/deposit',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().positive().required(),
    },
  }),
  accountController.create,
);

accountRouter.get('/balance', isAuthenticated, balanceController.index);

export default accountRouter;
