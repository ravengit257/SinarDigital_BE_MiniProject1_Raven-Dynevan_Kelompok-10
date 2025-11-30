import express from 'express';
import indexRouter from './routes/index.js';
import apiRouter from './routes/apiRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/movie', apiRouter);

app.use((req, res) => res.status(404).send('<h1>404 Not Found</h1>'));
app.use(errorHandler);


export default app;
