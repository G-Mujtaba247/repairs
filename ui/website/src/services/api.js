import axios from 'axios';
import { toast } from 'sonner';

const PREFIX = "/api/v1";
const BASE_URL = import.meta.env.SERVER_BASE_PATH || "http://localhost:5000";
const API_BASE = BASE_URL + PREFIX;

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

// Response interceptor for standardized error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        const code = error.response?.data?.code || 'UNKNOWN_ERROR';
        
        // Don't toast errors for specific codes that are already handled
        if (code !== 'VALIDATION_ERROR' && !error.config.url.includes('seed')) {
            console.error(`API Error [${code}]:`, message);
        }
        
        return Promise.reject({
            message,
            code,
            status: error.response?.status || 500,
            data: error.response?.data
        });
    }
);

// Webpage APIs
export const LIST_WEBPAGES = `${API_BASE}/website/webpages`;
export const DETAIL_WEBPAGE = `${API_BASE}/website/webpages`;

// About us APIs
export const ABOUTUS_DETAIL = `${API_BASE}/website/aboutus`;

// Contact us APIs
export const CONTACTUS_DETAIL = `${API_BASE}/website/contactus`;

// Booking APIs
export const BOOKING_CREATE = `${API_BASE}/website/bookings/create`;

// Repairer APIs
export const LIST_REPAIRERS = `${API_BASE}/website/repairers`;
export const SEED_REPAIRERS = `${API_BASE}/website/repairers/seed`;

// Helper function for API calls
export const fetchData = async (url, options = {}) => {
    try {
        const response = await apiClient.get(url, options);
        return {
            status: true,
            data: response.data.data || response.data,
            message: response.data.message
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            status: false,
            message: error.message,
            error
        };
    }
};

// Helper function for POST requests
export const postData = async (url, payload, options = {}) => {
    try {
        const response = await apiClient.post(url, payload, options);
        return {
            status: true,
            data: response.data.data || response.data,
            message: response.data.message
        };
    } catch (error) {
        console.error('Post error:', error);
        return {
            status: false,
            message: error.message,
            error
        };
    }
};

// Helper function for PATCH requests
export const updateData = async (url, payload, options = {}) => {
    try {
        const response = await apiClient.patch(url, payload, options);
        return {
            status: true,
            data: response.data.data || response.data,
            message: response.data.message
        };
    } catch (error) {
        console.error('Update error:', error);
        return {
            status: false,
            message: error.message,
            error
        };
    }
};

// Helper function for DELETE requests
export const deleteData = async (url, options = {}) => {
    try {
        const response = await apiClient.delete(url, options);
        return {
            status: true,
            data: response.data.data || response.data,
            message: response.data.message
        };
    } catch (error) {
        console.error('Delete error:', error);
        return {
            status: false,
            message: error.message,
            error
        };
    }
};

export default apiClient;
