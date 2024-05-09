import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import accountRouter from '@modules/account/infra/http/routes/account.routes';
import marketRouter from '@modules/market/infra/http/routes/market.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/account', accountRouter);
routes.use('/market', marketRouter);
export default routes;
