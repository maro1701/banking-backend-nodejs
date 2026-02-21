import {createAccountService} from '../services/account.service.js';

export async function create(req,res,next){
   try{
      const account = await  createAccountService(req.body);
      return res.status(201).json({account});
   } catch(err){
      next(err);
   }
}