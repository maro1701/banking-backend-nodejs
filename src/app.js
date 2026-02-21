import express from 'express';
import rateimit from 'express-rate-limit';
import userRoutes from './routes/user.routes.js';
import accountRoutes from './routes/account.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

const limiter = rateLimit({
   windowMs:15 * 60 * 1000, //15 minutes
   max:100, // max 100 requests per window
   standardHeaders:true,
   legacyHeaders:false
});

app.use('/users',userRoutes);

app.use('/accounts',accountRoutes);

app.use('/transactions',transactionRoutes)

app.use(limiter);

app.use(errorHandler);




export default app;