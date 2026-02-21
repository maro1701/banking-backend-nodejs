import {createUserDb} from '../repositories/user.repositories.js';

export async function createUserService(data){
   const result = await createUserDb(data.email,data.password);
   return result;
}