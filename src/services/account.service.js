import {createAccountDb} from '../repositories/account.repository.js';

export async function createAccountService(data){
   const service = await createAccountDb(data.userId,data.type,data.initialBalance);
   return service;
}