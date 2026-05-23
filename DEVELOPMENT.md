# Development Guide - Repairs CMS

## Getting Started

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd repairs.cms

# Install dependencies for all parts
cd server && npm install
cd ../ui/admin && npm install
cd ../website && npm install
```

### 2. Environment Setup

Copy `.env.example` files and fill in with your credentials:

```bash
# Server
cd server
cp .env.example .env

# Admin
cd ../ui/admin
cp .env.example .env

# Website
cd ../ui/website
cp .env.example .env
```

### 3. Database Setup

Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### 4. Seed Database (Optional)

```bash
cd server
npm run seed
```

This seeds the database with:
- 4 sample repairers
- 3 sample webpages
- About Us section
- Contact Us section with FAQs

## Development Workflow

### Running All Services

#### Terminal 1 - Server
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

#### Terminal 2 - Admin Dashboard
```bash
cd ui/admin
npm run dev
# Runs on http://localhost:5173 (or next available)
```

#### Terminal 3 - Public Website
```bash
cd ui/website
npm run dev
# Runs on Vite dev server port
```

## Project Architecture

### Backend (Node.js + Express)

```
server/
├── middleware/           # Custom middleware
│   ├── validation.js    # Input validation
│   └── responseHandler.js # API response standardization
├── routes/              # API endpoints
├── controllers/         # Business logic
├── models/              # MongoDB schemas
├── utils/               # Helper functions
└── scripts/
    └── seed.js          # Database seeding
```

### Frontend Structure

```
ui/
├── admin/               # Admin dashboard (React Router DOM)
│   └── src/
│       ├── pages/       # Admin pages
│       ├── components/  # Reusable components
│       └── resources/   # API endpoints
└── website/            # Public website (React Router)
    └── src/
        ├── pages/      # Website pages
        ├── services/   # API layer
        ├── lib/        # Utilities & validations
        └── components/ # Reusable components
```

## API Development

### Creating a New API Endpoint

1. **Create Route Handler** in `routes/`:

```javascript
// routes/newRoutes.js
import express from 'express';
import { getItems, createItem } from '../controllers/newController.js';
import { validateInput } from '../middleware/validation.js';

const router = express.Router();
router.get('/items', getItems);
router.post('/items', validateInput, createItem);

export default router;
```

2. **Create Controller** in `controllers/`:

```javascript
// controllers/newController.js
export const createItem = async (req, res) => {
    try {
        // Business logic here
        return res.apiSuccess({ item }, "Item created", "ITEM_CREATED");
    } catch (error) {
        return res.apiError(error.message, "CREATION_ERROR", 500);
    }
};
```

3. **Add Route to Server** in `server.js`:

```javascript
import newRouter from './routes/newRoutes.js';
app.use(PREFIX, newRouter);
```

4. **Add API Constant** in frontend `resources/server_apis.js`:

```javascript
export const CREATE_ITEM = `${API_BASE}/items`;
```

## Validation

### Backend Validation

All input is validated using middleware before reaching controllers:

```javascript
// routes/bookingRoutes.js
router.post('/create', validateBooking, createBooking);
```

Validation checks:
- Required fields present
- Email format valid
- Phone number valid (10+ digits)
- Input sanitization (XSS prevention)
- Data normalization

### Frontend Validation

Use validation utilities:

```javascript
import { validateEmail, validatePhone, validateURL } from '@/lib/validations';

// In form submission
if (!validateEmail(email)) {
    toast.error("Invalid email format");
}
```

## Error Handling

### API Response Format

Success:
```json
{
    "status": true,
    "code": "SUCCESS",
    "message": "Operation successful",
    "data": { ... },
    "timestamp": "2024-01-15T10:30:00Z"
}
```

Error:
```json
{
    "status": false,
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "timestamp": "2024-01-15T10:30:00Z"
}
```

### Frontend Error Handling

```javascript
try {
    const response = await axios.post(url, data);
    if (response.data.status) {
        toast.success(response.data.message);
    }
} catch (error) {
    const message = error.response?.data?.message || 'Unknown error';
    toast.error(message);
}
```

## Testing API Endpoints

### Using cURL

```bash
# Create Booking
curl -X POST http://localhost:5000/api/v1/website/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    "category": "refrigerator",
    "message": "My fridge is not cooling"
  }'
```

### Using Postman

1. Import the API endpoints
2. Set environment variables for SERVER_BASE_PATH
3. Test each endpoint with sample data

## Building for Production

### Server
```bash
cd server
npm run dev  # Already set up for production
```

### Admin Dashboard
```bash
cd ui/admin
npm run build
```

### Public Website
```bash
cd ui/website
npm run build
```

## Common Issues & Solutions

### Port Already in Use

```bash
# Change port in .env
PORT=5001

# Or kill existing process
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

```bash
# Ensure MongoDB is running
mongod

# Or use Atlas connection string
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/repairs
```

### CORS Errors

Add your frontend URL to server `.env`:

```
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,https://yourdomain.com
```

### Email Not Sending

1. Ensure Gmail app-specific password is used (not regular password)
2. Check environment variables are correct
3. Enable "Less secure apps" if needed
4. Check firewall/network settings

### Form Validation Not Working

1. Ensure validation middleware is added to routes
2. Check validator package is installed
3. Verify error messages are being shown in UI

## Performance Optimization

### Database Indexes

Add indexes to frequently queried fields in models:

```javascript
schema.index({ email: 1 });
schema.index({ status: 1, createdAt: -1 });
```

### Caching

Use browser caching headers:

```javascript
app.set('cache control', 'public, max-age=3600');
```

### Pagination

For large datasets, implement pagination:

```javascript
router.get('/items', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const items = await Item.find()
        .skip((page - 1) * limit)
        .limit(limit);
});
```

## Deployment

### Using Heroku

1. Create Heroku account
2. Install Heroku CLI
3. Connect repository
4. Set environment variables
5. Deploy

### Using Vercel (Frontend)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically on push

### Using Docker

Create `Dockerfile` for containerization and deploy to cloud services.

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB/Mongoose Guide](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## Need Help?

1. Check error messages and logs carefully
2. Search existing issues in documentation
3. Verify environment variables are set
4. Check network connectivity
5. Review browser console for client-side errors
6. Check server logs for backend errors

---

Happy development! 🚀
