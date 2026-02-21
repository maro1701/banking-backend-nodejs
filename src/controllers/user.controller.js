import {createUserService} from '../services/user.services.js';

export async function user(req,res,next){
   try{
   const user = await createUserService(req.body);
   return res.status(201).json({user});
   } catch(err){
      next(err);
   }
}