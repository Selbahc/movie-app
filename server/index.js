import express from 'express';
import { serverConfig, databaseConfig, tokenConfig } from './config';
import mongoose from 'mongoose';
import * as userRoutes from './routes/user';
import cors from 'cors';
import logger from 'morgan';

const app = express();

mongoose.connect(databaseConfig.url, () => console.log('Connected to Mongo DataBase'));

app.set('app-secret', tokenConfig.secret)

app.use(logger('dev'));
app.use(cors());
app.use(
  '/api', 
  userRoutes.login,
  userRoutes.register
);


app.listen(
  serverConfig.port,
  () => console.log(`Server listening on port ${serverConfig.port}`)
);

export default app;