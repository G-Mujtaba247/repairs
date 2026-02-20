const PREFIX = "/api/v1";
const BASE_URL = import.meta.env.SERVER_BASE_PATH || "http://localhost:5000" + PREFIX;

// webpage apis
export const LIST_WEBPAGES      = BASE_URL + '/website/webpages';
export const DETAIL_WEBPAGE     = BASE_URL + '/website/webpages';

// about us apis
export const ABOUTUS_DETAIL     = BASE_URL + '/website/aboutus';

// contact us apis
export const CONTACTUS_DETAIL   = BASE_URL + '/website/contactus';

// booking apis
export const BOOKING_CREATE     = BASE_URL + '/website/bookings/create';