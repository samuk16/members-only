<h1 align="center">Members Only</h1>

# Description
This project is a members-only message board developed as part of The Odin Project curriculum. It demonstrates user authentication, authorization levels, and permission-based content visibility. Users can post messages, but only authenticated members can see message authors and timestamps, while admin users have full deletion privileges.

# Features
- User authentication system with multiple permission levels
- Message board functionality with permission-based content visibility
- Secure password hashing with bcryptjs
- Session-based authentication
- Role-based access control:
  - Visitors can view message content
  - Members can see message authors and timestamps
  - Admins have message deletion privileges
- Server-side form validation
- Server-side rendering for optimal performance

# Key Functionalities
- User registration and authentication
- Secure login/logout functionality
- Create new messages (authenticated users only)
- View messages with different detail levels based on user role:
  - Public: Message content only
  - Members: Author and timestamp visibility
  - Admin: Full access with deletion rights
- Form validation and error handling

# Technologies Used
- Express.js (Backend framework)
- TypeScript (Type-safe programming)
- TSX (TypeScript Execute - Node.js enhancement)
- EJS (Template engine)
- Passport.js with Local Strategy (Authentication)
- bcryptjs (Password hashing)
- express-session (Session management)
- express-validator (Form validation)
- PostgreSQL (Database)
- CSS (Styling)

# Setup and Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Configure the following variables:
- PORT (optional)
- CONNECTION_DB_URL
- SESSION_SECRET
- MEMBER_CODE
- ADMIN_CODE

4. Build the project
```bash
pnpm run build
```

5. Start the server
```bash
pnpm start
```

# Project Structure
```
Members-Only/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers and business logic
│   ├── db/           # Database configuration 
│   ├── middlewares/  # Custom middleware (auth, validation)
│   ├── routes/       # Express routes
│   ├── types/        # Custom type definitions
│   ├── validators/   # Form validation schemas
│   ├── views/        # EJS templates
│   └── app.ts        # Server entry point
└── public/           # Static files (CSS, client-side JS)
```

# User Roles and Permissions
- **Visitors**
  - Can view message content
  - Cannot see authors or timestamps
- **Members**
  - Can create messages
  - Can see message authors and timestamps
  - Cannot delete messages
- **Admin**
  - Full message management capabilities
  - Can delete any message
  - Has all member privileges

# Acknowledgments
- The Odin Project for providing the project structure and requirements
- Express.js documentation and community
- Passport.js team for the authentication middleware
- TypeScript team for the type system
- EJS for the templating engine