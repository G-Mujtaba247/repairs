const PREFIX = "/api/v1";
const BASE_URL = "http://localhost:5000" + PREFIX;

// webpage apis
export const LIST_WEBPAGES = BASE_URL + '/webpages';
export const CREATE_WEBPAGE = BASE_URL + '/webpages/create';
export const DELETE_WEBPAGE = BASE_URL + '/webpages/delete';
export const UPDATE_WEBPAGE = BASE_URL + '/webpages/update';

// contact us apis
export const CONTACTUS_DETAIL = BASE_URL + '/contactus';
export const CREATE_CONTACTUS = BASE_URL + '/contactus/create';
export const UPDATE_CONTACTUS = BASE_URL + '/contactus/update';