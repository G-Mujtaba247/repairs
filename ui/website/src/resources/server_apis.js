// All API constants — single source of truth.
// SERVER_BASE_PATH must NOT include the /api/v1 prefix; it is appended here.
const BASE_URL = import.meta.env.VITE_SERVER_BASE_PATH || 'http://localhost:5000';
const PREFIX   = '/api/v1';
const API_BASE = BASE_URL + PREFIX;

// Webpage APIs
export const LIST_WEBPAGES    = `${API_BASE}/website/webpages`;
export const DETAIL_WEBPAGE   = `${API_BASE}/website/webpages`;

// About Us APIs
export const ABOUTUS_DETAIL   = `${API_BASE}/website/aboutus`;

// Contact Us APIs
export const CONTACTUS_DETAIL = `${API_BASE}/website/contactus`;

// Booking APIs
export const BOOKING_CREATE   = `${API_BASE}/website/bookings/create`;

// Repairer APIs
export const LIST_REPAIRERS   = `${API_BASE}/website/repairers`;
export const SEED_REPAIRERS   = `${API_BASE}/website/repairers/seed`;