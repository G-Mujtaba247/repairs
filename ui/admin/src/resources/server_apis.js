const PREFIX = "/api/v1";
const BASE_URL = "http://localhost:5000" + PREFIX;

// webpage apis
export const LIST_WEBPAGES = BASE_URL + '/webpages';
export const CREATE_WEBPAGE = BASE_URL + '/webpages/create';
export const DELETE_WEBPAGE = BASE_URL + '/webpages/delete';
export const UPDATE_WEBPAGE = BASE_URL + '/webpages/update';

// about us apis
export const ABOUTUS_DETAIL = BASE_URL + '/aboutus-details';
export const CREATE_ABOUTUS = BASE_URL + '/aboutus/create';
export const UPDATE_ABOUTUS = BASE_URL + '/aboutus/update';

// booking apis
export const ALL_BOOKINGS   = BASE_URL + '/bookings';
export const CREATE_BOOKING = BASE_URL + '/bookings/create';
export const UPDATE_BOOKING = BASE_URL + '/bookings/update';
export const DELETE_BOOKING = BASE_URL + '/bookings/delete';

// contact us apis
export const CONTACTUS_DETAIL = BASE_URL + '/contactus';
export const CREATE_CONTACTUS = BASE_URL + '/contactus/create';
export const UPDATE_CONTACTUS = BASE_URL + '/contactus/update';

