import {transactionService} from '../services/transaction.service.js';

export async function create(req,res,next){
   try{
         const transaction = await transactionService(req.body);
         return res.status(201).json({transaction}) ;
   } catch(err){
      next(err);
   }
}