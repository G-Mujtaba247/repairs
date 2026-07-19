import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dbConnect } from './config/db.js';
import { apiResponse, errorHandler, notFound } from './middleware/responseHandler.js';
import webpageRouter from './routes/webpageRoutes.js';
import contactUsRouter from './routes/contactUsRoutes.js';
import aboutUsRouter from './routes/aboutUsRoutes.js';
import settingsRouter from './routes/settingsRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import repairerRouter from './routes/repairerRoutes.js';
import authRouter from './routes/authRoutes.js';
import technicianRouter from './routes/technicianRoutes.js';
import marketplaceBookingRouter from './routes/marketplaceBookingRoutes.js';

const app = express();

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000').split(',');
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Response handler middleware
app.use(apiResponse);

const PORT = process.env.PORT || 5000;
const PREFIX = '/api/v1';

app.use(PREFIX, webpageRouter);
app.use(PREFIX, contactUsRouter);
app.use(PREFIX, bookingRouter);
app.use(PREFIX, repairerRouter);
app.use(PREFIX, authRouter);
app.use(PREFIX, technicianRouter);
app.use(PREFIX, marketplaceBookingRouter);
app.use(PREFIX, aboutUsRouter);
app.use(PREFIX, settingsRouter);

app.get('/test-server', async (req, res) => {
    return res.apiSuccess({ message: "Server is running" }, "Server is operational");
})

// 404 handler for undefined routes
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`)
        console.log(`📝 API Prefix: ${PREFIX}`)
        console.log(`🌍 CORS Enabled for: ${allowedOrigins.join(', ')}`)
    });
}).catch((err) => {
    console.error('❌ Failed to connect to database:', err.message)
    process.exit(1);
})