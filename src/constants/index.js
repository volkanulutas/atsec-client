export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9000/api';
export const ACCESS_TOKEN = 'JWTSuperSecretKey2';


export const API_URL_USER = '/user/';
export const API_URL_ROLE = '/role/';
export const API_URL_PERMISSION = '/permission/';
export const API_URL_CUSTOMER = '/customer/';
export const API_URL_DONOR = '/donor/';
export const API_URL_PRODUCT = '/product/';
export const API_URL_RAWPRODUCT = '/rawproduct/';
export const API_URL_DONOR_INSTITUTE = '/donorinstitute/';
export const API_URL_AUTH = '/auth/';
export const API_URL_TISSUE_TYPE = '/tissuetype/';
export const API_URL_LOCATION = '/location/';
export const API_URL_VERSION = '/version/';

export const ADDPDF_CONFIRMATION = "ADDPDF_CONFIRMATION";
export const ADDPDF_TRANSFER = "ADDPDF_TRANSFER";
export const ADDPDF_EXTRA = "ADDPDF_EXTRA";
export const CURRENT_RAW_PRODUCT_ID = "CURRENT_RAW_PRODUCT_ID";
export const BARCODE_PDF_VIEW = "BARCODE_PDF_VIEW";


export const  CONFIG = {
    headers: {
       Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    }
 }