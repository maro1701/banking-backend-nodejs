import {pool} from '../config/db.js'
import {hashPassword} from '../utils/hash.js';

export async function createUserDb(email,password){
   const first = await pool.query(`SELECT email FROM users WHERE email = $1`,[email]);
   if(first.rows.length>0) throw new Error('User found already');
      const hashed = await hashPassword(password);
   const final = await pool.query(`INSERT INTO users (email,password) VALUES($1,$2) RETURNING id,email,created_at`,[email,hashed]);
    return final.rows[0];
}