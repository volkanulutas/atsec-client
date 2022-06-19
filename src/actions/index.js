import {
  ADDPDF_BLOOD_RESULT,
  ADDPDF_CONFIRMATION,
  ADDPDF_EXTRA,
  ADDPDF_PRE_CONFIRM,
  ADDPDF_TRANSFER,
  BARCODE_PDF_VIEW,
  CURRENT_RAW_PRODUCT_ID,
} from "../constants";

export const addPdf_BarcodePdfView = (value) => {
  const action = {
    type: BARCODE_PDF_VIEW,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};
export const addPdf_Confirmation = (value) => {
  const action = {
    type: ADDPDF_CONFIRMATION,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};

export const addPdf_Transfer = (value) => {
  const action = {
    type: ADDPDF_TRANSFER,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};

export const addPdf_BloodResult = (value) => {
  const action = {
    type: ADDPDF_BLOOD_RESULT,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};

export const addPdf_PreConfirm = (value) => {
  const action = {
    type: ADDPDF_PRE_CONFIRM,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};

export const addPdf_Extra = (value) => {
  const action = {
    type: ADDPDF_EXTRA,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};

export const addCurrentRawProductId = (value) => {
  const action = {
    type: CURRENT_RAW_PRODUCT_ID,
    value,
  };
  console.log("action dan gelen ", action);
  return action;
};
