import {pool} from '../config/db.js';

export async function transactionDb(fromAccountId,toAccountId,amount,type,description){
   const client = await pool.connect();
    try{
      //lock both accounts
         await client.query('BEGIN');
         const fromAccount = await client.query(`SELECT balance FROM accounts WHERE id = $1 FOR UPDATE`,[fromAccountId]);
         const toAccount = await client.query(`SELECT balance FROM accounts WHERE id = $1 FOR UPDATE`,[toAccountId]);

          if(fromAccount.rows.length===0||toAccount.rows.length===0) throw new Error('Accounts dont exist');

         const fromBalance = fromAccount.rows[0].balance;
           
            if(fromBalance<amount) throw new Error('Insufficient funds');

            await client.query(`UPDATE accounts SET balance = balance -$1 WHERE id =$2`,[amount,fromAccountId]);

            await client.query(`UPDATE accounts SET balance = balance + $1 WHERE id =$2 `,[amount,toAccountId]);
            const txDebit =
            await client.query(`INSERT INTO transactions (account_id,amount,type,description) VALUES ($1,$2,'withdraw',$3) RETURNING account_id,amount,type,description`,[fromAccountId,amount,description]);

            const txCredit =  await client.query(`INSERT INTO transactions (account_id,amount,type,description) VALUES ($1,$2,'deposit',$3) RETURNING account_id,amount,type,description`,[toAccountId,amount,description]);

              await client.query('COMMIT');
              return {message:'Transaction successful',debit:txDebit.rows[0],credit:txCredit.rows[0]};
    } catch(err){
      await client.query('ROLLBACK');
      throw err;
    } finally{
      client.release();
    }
}