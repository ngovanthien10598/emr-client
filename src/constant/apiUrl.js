export const API_URL = 'https://emr-2020.wl.r.appspot.com/api';
export const NODE_URL = 'https://api.emr-client.tech';

/* -------------------- AUTHENTICATION -------------------- */
export const LOGIN_URL = API_URL + '/auth/login/';
export const REFRESH_TOKEN_URL = API_URL + '/auth/refresh-token/';
export const CHANGE_PASSWORD_URL = API_URL + '/auth/change-password/';

/* -------------------- ADMIN -------------------- */
export const ADMIN_DASHBOARD_URL = '';

// Drug
export const ADMIN_DRUG_CATEGORY_URL = API_URL + '/admin/manage-drug-category';
export const ADMIN_DRUG_UNIT_URL = API_URL + '/admin/manage-drug-unit';
export const ADMIN_DRUG_ROUTE_URL = API_URL + '/admin/manage-drug-route';
export const ADMIN_DRUG_DOSAGE_FORM_URL = API_URL + '/admin/manage-drug-dosage-form';
export const ADMIN_DRUG_URL = API_URL + '/admin/manage-drug';
export const ADMIN_DRUG_INSTRUCTION_URL = API_URL + '/admin/manage-drug-instruction';

// Disease
export const ADMIN_DISEASE_CATEGORY_URL = API_URL + '/admin/manage-disease-category';
export const ADMIN_DISEASE_URL = API_URL + '/admin/manage-disease';


/* -------------------- USER -------------------- */
// Drug
export const USER_DRUG_CATEGORY_URL = API_URL + '/user/drug-category';
export const USER_DRUG_UNIT_URL = API_URL + '/user/drug-unit';
export const USER_DRUG_ROUTE_URL = API_URL + '/user/drug-route';
export const USER_DRUG_DOSAGE_FORM_URL = API_URL + '/user/drug-dosage-form';
export const USER_DRUG_URL = API_URL + '/user/drug';
export const USER_DRUG_INSTRUCTION_URL = API_URL + '/user/drug-instruction';

// Disease
export const USER_DISEASE_CATEGORY_URL = API_URL + '/user/disease-category';
export const USER_DISEASE_URL = API_URL + '/user/disease';

/* -------------------- PATIENT -------------------- */