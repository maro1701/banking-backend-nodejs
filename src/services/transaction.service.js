import {transactionDb} from '../repositories/transaction.repository.js';

export async function transactionService(data){
   const result = await transactionDb(data.fromAccountId,data.toAccountId,data.amount,data.type,data.description);
    return result;
}