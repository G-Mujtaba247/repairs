# Repairs CMS - Complete Project Documentation

A modern, full-stack appliance repair service management system with an admin dashboard and customer-facing website.

## 🏗️ Project Structure

```
repairs.cms/
├── server/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware (validation, error handling)
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (email, cloudinary)
│   └── server.js           # Main server entry point
│
├── ui/
│   ├── admin/              # Admin dashboard (React + Vite)
│   │   └── src/
│   │       ├── components/ # Reusable components
│   │       ├── pages/      # Dashboard pages
│   │       └── resources/  # API endpoints & helpers
│   │
│   └── website/            # Public website (React + Vite)
│       └── src/
│           ├── components/ # Website components
│           ├── pages/      # Website pages
│           ├── services/   # API service layer
│           └── resources/  # Shared resources
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Backend Setup

```bash
cd server

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will run on `http://localhost:5000`

### 2. Admin Dashboard Setup

```bash
cd ui/admin

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

The admin dashboard will run on `http://localhost:5173` (or next available port)

### 3. Public Website Setup

```bash
cd ui/website

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will run on a Vite development server

## 🔧 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URL_LOCAL=mongodb://localhost:27017/repairs
MONGODB_URL_PROD=<atlas-url>
EMAIL_USER=<gmail-address>
EMAIL_PASS=<gmail-app-password>
CLOUDINARY_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
JWT_SECRET=<secret-key>
```

### Admin UI (.env)
```
VITE_SERVER_BASE_PATH=http://localhost:5000
VITE_API_PREFIX=/api/v1
```

### Website UI (.env)
```
VITE_SERVER_BASE_PATH=http://localhost:5000
VITE_API_PREFIX=/api/v1
```

## 📋 API Documentation

### Base URL
`http://localhost:5000/api/v1`

### Booking Endpoints

**Create Booking**
- `POST /website/bookings/create`
- Body: `{ firstName, lastName, email, phone, message, category }`
- Validation: Email, phone format, required fields

**Get All Bookings**
- `GET /bookings`
- Auth: Admin only

**Update Booking Status**
- `PATCH /bookings/update`
- Body: `{ bookingId, status }`
- Status: pending, confirmed, dispatched, processing, completed, cancelled

### Contact Us Endpoints

**Get Contact Details**
- `GET /website/contactus` or `/contactus`

**Create/Update Contact Info**
- `POST /contactus/create`
- `PATCH /contactus/update/:id`
- Body: `{ phone, email, address, map, faqs }`

### Webpage Endpoints

**Get All Pages**
- `GET /website/webpages` (public)
- `GET /webpages` (admin)

**Get Page Details**
- `GET /website/webpages/:slug` (public)
- `GET /webpages/:id` (admin)

**Create/Update/Delete Pages**
- `POST /webpages/create`
- `PATCH /webpages/update/:id`
- `DELETE /webpages/delete/:id`

### Repairer Endpoints

**Get All Repairers**
- `GET /website/repairers` (public)
- `GET /repairers` (admin)

**Create/Update/Delete Repairers**
- `POST /repairers/create`
- `PATCH /repairers/update`
- `DELETE /repairers/delete/:repairerId`

## 🔒 Security Features

- ✅ Input validation middleware on all POST/PATCH requests
- ✅ Email validation and sanitization
- ✅ CORS configuration for specified origins
- ✅ Error boundary components in frontend
- ✅ Environment variable management
- ✅ Proper HTTP status codes (200, 400, 404, 500)

## 🎨 UI/UX Improvements

- ✅ Responsive design with Tailwind CSS
- ✅ Component library (shadcn/ui)
- ✅ Loading states and skeletons
- ✅ Error messages and validation feedback
- ✅ Toast notifications (Sonner)
- ✅ Carousel components for showcasing
- ✅ Accordion for FAQs

## 🔄 Latest Improvements

1. **Middleware Added**
   - Input validation for all endpoints
   - Standardized API response format
   - Error handling middleware
   - CORS whitelist configuration

2. **Error Handling**
   - Error boundaries in React components
   - Standardized error response structure
   - Validation error messages
   - Development error details

3. **Frontend Enhancements**
   - API service layer with interceptors
   - Better error handling and retry logic
   - Loading states throughout the app
   - Improved form validation feedback

4. **Configuration**
   - .env.example files for all projects
   - Environment variable validation
   - Better server logging

## 📦 Dependencies

### Server
- Express.js - Web framework
- MongoDB/Mongoose - Database
- Nodemailer - Email service
- Cloudinary - Image hosting
- Validator - Input validation
- JWT - Authentication
- Dotenv - Environment variables

### Frontend
- React - UI framework
- Vite - Build tool
- React Router - Routing
- Tailwind CSS - Styling
- shadcn/ui - Component library
- Axios - HTTP client
- React Hook Form - Form handling
- Sonner - Toast notifications
- Lucide React - Icons

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change PORT in .env
PORT=5001
```

**MongoDB connection error?**
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check connection string in .env

**CORS errors?**
- Add your frontend URL to `CORS_ORIGIN` in server .env
- Format: `http://localhost:5173,http://localhost:3000`

**Email not sending?**
- Use Gmail app-specific password (not regular password)
- Enable "Less secure apps" if needed

## 📝 Development Notes

- API responses follow standardized format: `{ status, code, message, data, timestamp }`
- All errors include error codes for better error handling
- Validation errors are detailed with field-specific messages
- All timestamps are in ISO format

## 📄 License

Proprietary - All rights reserved

## 👨‍💻 Support

For issues or questions, please check the error logs and ensure:
1. All environment variables are set correctly
2. MongoDB is running and accessible
3. All dependencies are installed
4. Ports are not in use by other services

---

Happy coding! 🚀
