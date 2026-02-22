**Banking Backend API**
A RESTful banking built with Node.js, Express and PostgreSQL.
 Implements atomic money transfers using explicit database transactions and follows a layered architecture separating HTTP, business logic and data access.

 Tech Stack
 1. Node.js
 2. Express
 3. PostgreSQL
 4. pg(node-postgres)
 5. express-rate-limit

 Architecture
 Route > Controller > Service > Repository > PostgreSQL

 src/
 ├── config/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── routes/
 ├── middlewares/
 ├── utils/
 ├── app.js
 └── server.js

 Respnsibilities
 1.Routes: Define API endpoints.
 2. Controllers: Handle requests/response.
 3.Services:Business rules and transaction orchestration.
 4.Repositories: Raw SQL queries only.
 5.Middlewares:Error handling and rate-limiting.

 Features
 1. Create users
 2. Create accounts
 3. Deposit
 4. Withdraw
 5. Transfer between accounts
 6. Rate liiting on API endpoints
 7. Global error handling middleware

    Atomic Transfers (ACID)
    Transfers are executed using explicit transaction control:
    
    BEGIN;
-- update sender balance
-- update receiver balance
-- insert transaction records
COMMIT;

if any operation fails:
ROLLBACK;
 This ensures:
 1. No partial balance updates.
 2. No inconsistent account state
 3. All-or-nothing execution

    Business Rules(Invariants)
    1. Amount must be greater than zero.
    2. Accounts must exist.
    3. Sender must have sufficient balance.
    4. Both debit and credit must succeed
       If any rule fail, transaction is rolled back.

  Rate Limiting
  Rate limiting is applied at the middleware layer to protect endpoints from abuse and excessive requests.

  Setup 
  1.Clone
 git clone https://github.com/maro1701/banking-backend-nodejs.git
cd banking-backend-nodejs

2. Install
npm install
3. Configure Environment
   Create a .env file:
   PORT=3000
DATABASE_URL=your_postgres_connection_string
4.Run
npm run dev

or
node src/server.js

Example Transfer Request
JSON
{
  "fromAccountId": 1,
  "toAccountId": 2,
  "amount": 100,
  "description": "Payment"
}
Design Goals
1. Clear separation of concerns.
2. Explicit transactions boundaries.
3. No business logic in controllers.
4. No SQL in services.
5. Predictable error handling.

