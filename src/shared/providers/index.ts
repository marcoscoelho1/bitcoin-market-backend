import { container } from 'tsyringe';

import { IHttpProvider } from './HttpProvider/models/IHttpProvider';
import HttpProvider from './HttpProvider/implementations/HttpProvider';

container.registerSingleton<IHttpProvider>('HttpProvider', HttpProvider);
