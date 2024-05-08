import { Router } from 'express';

import AccountController from '../controllers/AccountController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

const accountController = new AccountController();

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

export default accountRouter;
