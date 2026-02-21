import {pool} from '../config/db.js';

export  async function createAccountDb(userId,type,initialBalance){
    const first = await pool.query(`SELECT user_id FROM accounts WHERE user_id = $1`,[userId]);
   if(first.rows.length>0) throw new Error('Account found already');
    const final = await pool.query(`INSERT INTO accounts(user_id,type,balance) VALUES($1,$2,$3) RETURNING id,user_id,balance,created_at`,[userId,type,initialBalance]);
    return final.rows[0];
}