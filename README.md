 # Role-Based Authentication API (Node.js)

A backend REST API built with Node.js, Express, and MongoDB implementing secure authentication, authorization, and admin user management features.

##  Features

- User Registration & Login
- JWT Authentication (Access Token)
- Refresh Token with Token Rotation
- Role-Based Authorization (Admin / User / Manager)
- Protected Routes
- User Profile API
- Admin Controls:
  - Block / Unblock User
  - Delete User
  - Check profile
- Secure Password Hashing (bcrypt)
- Environment-based configuration


##  Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv


##  Authentication Flow

1. User logs in
2. Backend returns:
   - Access Token (short-lived)
   - Refresh Token (long-lived)
3. Access token expires
4. Client sends refresh token
5. Backend issues:
   - New access token
   - New refresh token (rotation)


##  API Endpoints

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh


### User Routes
- GET /api/users/profile (Protected)
- PATCH /api/users/block/:id (Admin only)
- DELETE /api/users/delete/:id (Admin only)


##  Security

- Passwords hashed using bcrypt
- JWT expiration handling
- Refresh token stored securely in database
- Blocked users restricted from accessing APIs
- Role-based access control


## How to Run Locally

```bash
git clone https://github.com/EmanTanveer-hub/role-based-API.git
cd role-based-API
npm install
npm run dev

## Author
Eman




