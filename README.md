# PSS III Personal Website

A modern personal website with a sophisticated authentication system, featuring a Jeton-inspired intro animation and a Flask backend with user management.

## Features

### Frontend
- **Jeton-style Intro Animation**: Smooth loading sequence with scattered letter animation
- **PSS III Logo**: Rolls-Royce inspired 3D beveled logo design
- **Modern Dark Theme**: Clean, professional aesthetic
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Framer Motion powered transitions

### Backend Authentication System
- **User Registration**: Complete registration with email verification
- **Manual Approval**: Admin approval system for new users
- **Email Notifications**: Automated emails for verification and approvals
- **Secure Authentication**: Bcrypt password hashing
- **Session Management**: Flask-Login integration
- **Admin Panel**: User management capabilities

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Flask 3.1
- SQLAlchemy (SQLite)
- Flask-Login
- Flask-Mail
- Bcrypt
- WTForms

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal_website.1
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your email settings
   ```

5. **Database Setup**
   ```bash
   cd backend
   python create_admin.py
   ```

6. **Start the Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   .\venv\Scripts\Activate.ps1
   python app.py
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Authentication Flow

### User Registration
1. User fills out registration form
2. Account is created but not verified/approved
3. Verification email is sent to user
4. Admin notification is sent
5. User clicks verification link
6. Admin approves user account
7. User can now sign in

### User Login
1. User enters credentials
2. System checks email verification
3. System checks admin approval
4. User is logged in and redirected to dashboard

### Admin Functions
- View all users
- Approve/reject user registrations
- Manage user accounts

## Default Admin Account
- **Username**: admin
- **Password**: admin123
- **Email**: admin@example.com

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user info

### Email Verification
- `GET /verify-email/<token>` - Email verification

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users/<id>/approve` - Approve user
- `POST /api/admin/users/<id>/reject` - Reject user

## Email Configuration

To enable email functionality, update the `.env` file:

```env
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com
```

**Note**: For Gmail, you'll need to use an App Password instead of your regular password.

## Project Structure

```
personal_website.1/
├── frontend/                 # Next.js frontend
│   ├── src/app/
│   │   ├── components/       # React components
│   │   ├── register/         # Registration page
│   │   ├── signin/          # Login page
│   │   ├── dashboard/       # User dashboard
│   │   └── guest/           # Guest access page
│   └── package.json
├── backend/                  # Flask backend
│   ├── app.py               # Main Flask application
│   ├── models.py            # Database models
│   ├── forms.py             # WTForms
│   ├── config.py            # Configuration
│   ├── email_utils.py       # Email functions
│   ├── create_admin.py      # Admin creation script
│   └── requirements.txt
└── README.md
```

## Development

### Adding New Features
1. Backend: Add routes in `app.py`
2. Frontend: Create new pages in `src/app/`
3. Database: Update models in `models.py`

### Testing
- Test registration flow
- Test email verification
- Test admin approval process
- Test login/logout functionality

## Deployment

### Backend
- Use a production WSGI server (Gunicorn)
- Set up a production database (PostgreSQL)
- Configure environment variables
- Set up email service

### Frontend
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or similar

## Security Notes

- Change default admin credentials
- Use strong SECRET_KEY in production
- Enable HTTPS in production
- Regularly update dependencies
- Implement rate limiting
- Add CSRF protection

## License

This project is for personal use. Please respect the original design and code.
