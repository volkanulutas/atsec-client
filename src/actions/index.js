import { ADDPDF_CONFIRMATION, ADDPDF_EXTRA, ADDPDF_TRANSFER, ADDPDF_TRANSPORTATION, BARCODE_PDF_VIEW, CURRENT_RAW_PRODUCT_ID } from '../constants';

export const addPdf_Confirmation = (value) => {
  const action = {
    type: ADDPDF_CONFIRMATION,
    value,
  }
  console.log('action dan gelen ', action);
  return action;
}

export const addPdf_BarcodePdfView = (value) => {
  const action = {
    type: BARCODE_PDF_VIEW,
    value,
  }
  console.log('action dan gelen ', action);
  return action;
}

export const addPdf_Transfer= (value) => {
  const action = {
    type: ADDPDF_TRANSFER,
    value,
  }
  console.log('action dan gelen ', action);
  return action;
}

export const addPdf_Transportation = (value) => {
  const action = {
    type: ADDPDF_TRANSPORTATION,
    value,
  }
  console.log('action dan gelen ', action);
  return action;
}

export const addPdf_Extra = (value) => {
  const action = {
    type: ADDPDF_EXTRA,
    value,
  }
  console.log('action dan gelen ', action);
  return action;
}

export const addCurrentRawProductId = (value) => {
  const action = {
    type: CURRENT_RAW_PRODUCT_ID,
    value,
  }
  console.log('action dan gelen ', action);
  return action;
}