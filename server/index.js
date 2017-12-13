import express from 'express';
import { serverConfig, databaseConfig, tokenConfig } from './config';
import mongoose from 'mongoose';
import registerRoute from './routes/register';
import loginRoute from './routes/login'
import cors from 'cors';
import logger from 'morgan';

const app = express();

mongoose.connect(databaseConfig.url, () => console.log('Connected to Mongo DataBase'));

app.set('app-secret', tokenConfig.secret)

app.use(logger('dev'));
app.use(cors());
app.use('/api', registerRoute);
app.use('/api', loginRoute);


app.listen(
  serverConfig.port,
  () => console.log(`Server listening on port ${serverConfig.port}`)
);
export default app;