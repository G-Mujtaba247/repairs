# Complete Setup Guide - Repairs CMS

Follow this step-by-step guide to set up the Repairs CMS project on your local machine.

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) - Check with `npm --version`
- **MongoDB** - Either [local install](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## Step 1: Clone the Repository

```bash
# Clone the project
git clone <repository-url>
cd repairs.cms

# Verify structure
ls -la
# You should see: server/, ui/, README.md, etc.
```

## Step 2: Backend Setup

### 2.1 Navigate to Server Directory

```bash
cd server
```

### 2.2 Install Dependencies

```bash
npm install
# This installs: express, mongoose, cors, nodemailer, cloudinary, validator, etc.
```

### 2.3 Create Environment File

```bash
# Copy template
cp .env.example .env

# Edit with your text editor or use this template:
```

Create `server/.env` file with:

```env
# Server Configuration
PORT=5000

# Database (choose one)
# Option 1: Local MongoDB
MONGODB_URL_LOCAL=mongodb://localhost:27017/repairs

# Option 2: MongoDB Atlas (recommended for production)
# MONGODB_URL_PROD=mongodb+srv://username:password@cluster.mongodb.net/repairs?appName=Cluster0

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Cloudinary (Image Upload)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_URL=cloudinary://key:secret@your-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# JWT (for future authentication)
JWT_SECRET=your-super-secret-key-min-32-chars-long
JWT_EXPIRE=7d
```

### 2.4 Configure Email (Gmail)

1. Go to [Google Account](https://myaccount.google.com/)
2. Navigate to Security settings
3. Enable 2-Step Verification
4. Create App Password for Gmail
5. Copy the 16-character password
6. Paste in `EMAIL_PASS` in .env

### 2.5 Configure Cloudinary (Optional)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add to .env file

## Step 3: Frontend Setup

### 3.1 Admin Dashboard

```bash
# Navigate to admin
cd ../ui/admin

# Install dependencies
npm install

# Copy environment
cp .env.example .env
```

Edit `ui/admin/.env`:

```env
VITE_SERVER_BASE_PATH=http://localhost:5000
VITE_API_PREFIX=/api/v1
```

### 3.2 Public Website

```bash
# Navigate to website
cd ../ui/website

# Install dependencies
npm install

# Copy environment
cp .env.example .env
```

Edit `ui/website/.env`:

```env
VITE_SERVER_BASE_PATH=http://localhost:5000
VITE_API_PREFIX=/api/v1
```

## Step 4: Database Setup

### Option A: Local MongoDB

```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh
# Type: exit
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and login
3. Create a new cluster
4. Create database user (note username and password)
5. Get connection string
6. Update `MONGODB_URL_PROD` in `.env`

### Seed Database with Sample Data

```bash
# From server directory
cd server
npm run seed

# You should see:
# ✅ 4 repairers seeded
# ✅ 3 webpages seeded
# ✅ About Us section seeded
# ✅ Contact Us section seeded
# 🎉 Database seeded successfully!
```

## Step 5: Run the Application

Open three terminal windows and run each in its own terminal:

### Terminal 1 - Backend Server

```bash
cd repairs.cms/server
npm run dev

# Expected output:
# 🚀 Server is running at http://localhost:5000
# 📝 API Prefix: /api/v1
# ✅ MongoDB is connected
```

### Terminal 2 - Admin Dashboard

```bash
cd repairs.cms/ui/admin
npm run dev

# Expected output:
# VITE v4.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173
```

### Terminal 3 - Public Website

```bash
cd repairs.cms/ui/website
npm run dev

# Expected output:
# VITE v4.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5174 (or next available)
```

## Step 6: Verify Everything Works

### 6.1 Test Backend

Open browser and visit:

```
http://localhost:5000/test-server
```

You should see:

```json
{
  "status": true,
  "code": "SUCCESS",
  "message": "Server is operational",
  "data": { "message": "Server is running" },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 6.2 Test Admin Dashboard

Visit:

```
http://localhost:5173
```

You should see the admin dashboard with:
- Dashboard stats
- Navigation menu
- All pages loading correctly

### 6.3 Test Public Website

Visit:

```
http://localhost:5174 (or your terminal output)
```

You should see:
- Homepage with hero carousel
- Navigation bar
- Services section
- About us section

## Step 7: Test Core Features

### 7.1 Test Booking Form

1. Go to public website
2. Navigate to Contact page
3. Fill out booking form with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: (555) 123-4567
   - Category: Refrigerator
   - Issue: Not cooling
   - Message: My fridge is not cooling properly

4. Click "Book Appointment"
5. You should see success message and confirmation email

### 7.2 Test Admin Panel

1. Go to admin dashboard (localhost:5173)
2. Navigate to Booking page
3. You should see the booking you just created
4. Try changing status and deleting (with confirmation)

### 7.3 Test Form Validation

Try submitting forms with:
- Empty fields → See error messages
- Invalid email → See validation error
- Invalid phone → See validation error
- Missing category → See error

## Troubleshooting

### Issue: Port Already in Use

```bash
# Change port in server .env
PORT=5001

# Or kill the process (macOS/Linux)
lsof -i :5000
kill -9 <PID>

# Or on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: MongoDB Connection Error

```bash
# Check if MongoDB is running
mongosh

# If not, start it:
# macOS
brew services start mongodb-community

# Or use MongoDB Atlas with correct connection string
MONGODB_URL_PROD=mongodb+srv://user:password@cluster.mongodb.net/repairs
```

### Issue: CORS Error

Add your frontend URL to server `.env`:

```env
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:3000
```

### Issue: Email Not Sending

1. Check Gmail app-specific password (not regular password)
2. Enable "Less secure app access" if needed
3. Verify EMAIL_USER and EMAIL_PASS in .env
4. Check firewall/antivirus not blocking

### Issue: Node Modules Not Found

```bash
# Clear and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

### Issue: Cannot Read from .env

```bash
# Verify .env file exists in correct directory
ls -la .env

# Restart development server after creating .env
npm run dev
```

## Directory Structure

After setup, your structure should look like:

```
repairs.cms/
├── server/
│   ├── .env (your credentials)
│   ├── .env.example
│   ├── package.json
│   ├── node_modules/
│   ├── middleware/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── scripts/
│
├── ui/
│   ├── admin/
│   │   ├── .env
│   │   ├── package.json
│   │   └── node_modules/
│   │
│   └── website/
│       ├── .env
│       ├── package.json
│       └── node_modules/
│
├── README.md
├── DEVELOPMENT.md
├── CHANGELOG.md
└── .gitignore
```

## Next Steps

1. **Explore Admin Dashboard** - Create webpages, manage bookings
2. **Customize Website** - Update content via admin panel
3. **Test All Features** - Try all forms and pages
4. **Read Documentation** - Check README.md and DEVELOPMENT.md
5. **Deploy** - When ready, follow deployment guide

## Helpful Commands

```bash
# Start everything (from project root)
# Terminal 1
cd server && npm run dev

# Terminal 2
cd ui/admin && npm run dev

# Terminal 3
cd ui/website && npm run dev

# Seed database
cd server && npm run seed

# Clear and reinstall dependencies
npm cache clean --force && rm -rf node_modules && npm install
```

## Production Checklist

Before deploying to production:

- [ ] Change all .env variables to production values
- [ ] Update CORS_ORIGIN to your domain
- [ ] Use MongoDB Atlas (not local)
- [ ] Set NODE_ENV=production
- [ ] Use secure email credentials
- [ ] Enable HTTPS
- [ ] Set up backups
- [ ] Update API documentation
- [ ] Test all features on staging
- [ ] Set up monitoring

## Support & Resources

- **Documentation**: Check README.md and DEVELOPMENT.md
- **GitHub Issues**: Report bugs or feature requests
- **Environment Reference**: Check .env.example files
- **API Reference**: See DEVELOPMENT.md API section

---

## Congratulations! 🎉

Your Repairs CMS is now set up and running! 

Start by:
1. Visiting the public website at `http://localhost:5174`
2. Trying the booking form
3. Checking admin dashboard at `http://localhost:5173`
4. Reading the documentation for more features

Happy coding! 🚀
