import { ADDPDF_CONFIRMATION, ADDPDF_EXTRA, ADDPDF_TRANSFER, CURRENT_RAW_PRODUCT_ID,
     BARCODE_PDF_VIEW} from '../constants';

const initialState = {
    pdfFile_Confirmation: null,
    pdfFile_Extra: null, 
    currentRawProductId: -1, 
    barcodePdfView: null,
};

const pdfFile = (action) => {
  return {
    id: Math.random(),
    value: action.value,
    type: action.type
  }
}


const reducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case ADDPDF_CONFIRMATION:
            newState.pdfFile_Confirmation = pdfFile(action);
            console.log('yeni addpdf_confirmation eklendi',  pdfFile(action));
            return newState; 
        case ADDPDF_TRANSFER:
            newState.pdfFile_Transfer = pdfFile(action);
            console.log('yeni addpdf_transfer eklendi',  pdfFile(action));
            return newState;
        case ADDPDF_EXTRA:
            newState.pdfFile_Extra = pdfFile(action);
            console.log('yeni addpdf_extra eklendi',  pdfFile(action));
            return newState;
        case CURRENT_RAW_PRODUCT_ID:
            newState.currentRawProductId = action;
            console.log('yeni raw product eklendi', action);
            return newState;
        case BARCODE_PDF_VIEW:
            newState.barcodePdfView = pdfFile(action);
            console.log('yeni barcode pdf eklendi', action);
            return newState;     
        default:
        return newState;
    }
}

export default reducer;