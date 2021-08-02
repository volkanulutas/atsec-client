import React,{useState, useEffect} from 'react'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FormGroup } from "reactstrap";

import ViewModel from '../util/modal/ViewModel';
import {connect} from 'react-redux';

import { addPdf_Confirmation, addPdf_Transfer, addPdf_Transportation, addPdf_Extra} from '../../actions';
import { ADDPDF_CONFIRMATION, ADDPDF_TRANSFER, ADDPDF_TRANSPORTATION, ADDPDF_EXTRA } from '../../constants';
import store from '../../store';

import RawProductService from '../../services/RawProductService';

const Step3 = props => {
  // for onchange event
  const [pdfFile_Confirmation, setPdfFile_Confirmation]=useState(null);
  const [pdfFileError_Confirmation, setPdfFileError_Confirmation]=useState('');

  const [pdfFile_Transfer, setPdfFile_Transfer]=useState(null);
  const [pdfFileError_Transfer, setPdfFileError_Transfer]=useState('');

  const [pdfFile_Transportation, setPdfFile_Transportation]=useState(null);
  const [pdfFileError_Transportation, setPdfFileError_Transportation]=useState('');

  const [pdfFile_Extra, setPdfFile_Extra]=useState(null);
  const [pdfFileError_Extra, setPdfFileError_Extra]=useState('');


  const [progressConfirmation, setProgressConfirmation,]=useState(null);
  const [progressTransfer, setProgressTransfer]=useState(null);
  const [progressTransportation, setProgressTransportation,]=useState(null);
  const [progressExtra, setProgressExtra]=useState(null);

  // for submit event
  const [viewPdf_Confirmation, setViewPdf_Confirmation]=useState(null);
  const [viewPdf_Transfer, setViewPdf_Transfer]=useState(null);
  const [viewPdf_Transportation, setViewPdf_Transportation]=useState(null);
  const [viewPdf_Extra, setViewPdf_Extra]=useState(null);

  useEffect(() => {

  });

  // onchange event
  const fileType=['application/pdf'];

  if (props.currentStep !== 3) {
    return null;
  }

  const handlePdfFileChange_Confirmation=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile_Confirmation(e.target.result);
              setPdfFileError_Confirmation('');
              props.addPdf_Confirmation(e.target.result);
            }
      }
      else{
        setPdfFile_Confirmation(null);
        props.addPdf_Confirmation(null);
        setPdfFileError_Confirmation('Lütfen PDF dosyası seçiniz.');
      }
    }
    else{
      console.log('Dosya Seç:');
    }
  }

  const handlePdfFileChange_Transfer=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile_Transfer(e.target.result);
              setPdfFileError_Transfer('');

              props.addPdf_Transfer(e.target.result);
            }
      }
      else{
        setPdfFile_Transfer(null);
        props.addPdf_Transfer(null);
        setPdfFileError_Transfer('Lütfen PDF dosyasını seçiniz.');
      }
    }
    else{
      console.log('Dosya Seç:');
    }
  }

  const handlePdfFileChange_Transportation=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile_Transportation(e.target.result);
              setPdfFileError_Transportation('');

              props.addPdf_Transportation(e.target.result);
            }
      }
      else{
        setPdfFile_Transportation(null);
        props.addPdf_Transportation(null);
        setPdfFileError_Transportation('Lütfen PDF dosyasını seçiniz.');
      }
    }
    else{
      console.log('Dosya Seç:');
    }
  }

  const handlePdfFileChange_Extra=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile_Extra(e.target.result);
              setPdfFileError_Extra('');

              props.addPdf_Extra(e.target.result);
            }
      }
      else{
        setPdfFile_Extra(null);
        props.addPdf_Extra(null);
        setPdfFileError_Extra('Lütfen PDF dosyasını seçiniz.');
      }
    }
    else{
      console.log('Dosya Seç:');
    }
  }

  // form submit
  const handlePdfFileSubmit_Confirmation=(e)=>{
    e.preventDefault();

    if(pdfFile_Confirmation!==null){
      setViewPdf_Confirmation(pdfFile_Confirmation);

      let st = store.getState();  
      let currentRawProductId = st.currentRawProductId;

    RawProductService.upload(
      pdfFile_Confirmation,
      "RAW_CONFIRMATION_FILES",
      currentRawProductId.value,
      (event) => {
        setProgressConfirmation(Math.round((100 * event.loaded) / event.total));
      }
    );
    }
    else{
      setViewPdf_Confirmation(null);
    }
  }


  // form submit
  const handlePdfFileSubmit_Transportation=(e)=>{
    e.preventDefault();
    if(pdfFile_Transportation!==null){
      setViewPdf_Transportation(pdfFile_Transportation);

    let st = store.getState();  
    let currentRawProductId = st.currentRawProductId;
      
    RawProductService.upload(
      pdfFile_Transportation,
      "RAW_TRANSFER_FILES",
      currentRawProductId,
      (event) => {
        setProgressTransfer(Math.round((100 * event.loaded) / event.total));
      }
    );
    }
    else{
      setViewPdf_Transportation(null);
    }
  }

    // form submit
    const handlePdfFileSubmit_Transfer=(e)=>{
      e.preventDefault();
      if(pdfFile_Transfer!==null){
        setViewPdf_Transfer(pdfFileError_Transfer);
        let st = store.getState();  
        let currentRawProductId = st.currentRawProductId;
        
      RawProductService.upload(
          pdfFile_Transportation,
          "RAW_TRANSPORTATION_FILES",
          currentRawProductId,
          (event) => {
            setProgressTransportation( Math.round((100 * event.loaded) / event.total));
          }
        );
      }
      else{
        setViewPdf_Transfer(null);
      }
    }
    // form submit
    const handlePdfFileSubmit_Extra=(e)=>{
      e.preventDefault();
      if(pdfFile_Extra!==null){
        setViewPdf_Extra(pdfFile_Extra);

        let st = store.getState();  
        let currentRawProductId = st.currentRawProductId;
        
        RawProductService.upload(
          pdfFile_Extra,
          "RAW_EXTRA_FILES",
          currentRawProductId,
          (event) => {
            setProgressExtra(Math.round((100 * event.loaded) / event.total));
          }
        );
      }
      else{
        setViewPdf_Extra(null);
      }
    }
  return (
  <>
  <FormGroup>
      <form className='form-group' >
        <label>Onam Formu:</label>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange_Confirmation}
        />
        {pdfFileError_Confirmation&&<div className='error-msg'>{pdfFileError_Confirmation}</div>}
        <br></br>
        <button onClick={handlePdfFileSubmit_Confirmation} className='btn btn-success btn-lg'>
          Yükle
        </button>
        <ViewModel
          class="vlu-left-margin"
          initialModalState={false}
          component={"ViewPdfComponent"}
          callback={props.viewExtraForm}
          isEditable ={props.isEditable}
          viewPdf={ADDPDF_CONFIRMATION}
        />
      </form>

      <form className='form-group' >
        <label>Transfer Formu:</label>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange_Transfer}
        />
        {pdfFileError_Transfer&&<div className='error-msg'>{pdfFileError_Transfer}</div>}
        <br></br>
        <button onClick={handlePdfFileSubmit_Transfer} className='btn btn-success btn-lg'>
          Yükle
        </button>

        <ViewModel
          class="vlu-left-margin"
          initialModalState={false}
          component={"ViewPdfComponent"}
          callback={props.viewExtraForm}
          isEditable ={props.isEditable}
          viewPdf={ADDPDF_TRANSFER}
        />
      </form>

      <form className='form-group' >
        <label>Taşıma Formu:</label>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange_Transportation}
        />
        {pdfFileError_Transportation&&<div className='error-msg'>{pdfFileError_Transportation}</div>}
        <br></br>
        <button onClick={handlePdfFileSubmit_Transportation} className='btn btn-success btn-lg'>
          Yükle
        </button>

        <ViewModel
          class="vlu-left-margin"
          initialModalState={false}
          component={"ViewPdfComponent"}
          callback={props.viewExtraForm}
          isEditable ={props.isEditable}
          viewPdf={ADDPDF_TRANSPORTATION}
        />
      </form>

      <form className='form-group' >
        <label>Ekstra Form:</label>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange_Extra}
        />
        {pdfFileError_Extra&&<div className='error-msg'>{pdfFileError_Extra}</div>}
        <br></br>
        <button onClick={handlePdfFileSubmit_Extra} className='btn btn-success btn-lg'>
          Yükle
        </button>

        <ViewModel
          class="vlu-left-margin"
          initialModalState={false}
          component={"ViewPdfComponent"}
          callback={props.viewExtraForm}
          isEditable ={props.isEditable}
          viewPdf={ADDPDF_EXTRA}
        />
      </form>
    </FormGroup>
    </>
  )
}


function mapStateToProps(state){
  return {
    pdfFile_Confirmation: state.pdfFile_Confirmation,
    pdfFile_Transfer: state.pdfFile_Transfer,
    pdfFile_Transportation: state.pdfFile_Transportation,
    pdfFile_Extra: state.pdfFile_Extra,
  }
}

export default connect(mapStateToProps, 
  {addPdf_Confirmation, addPdf_Transfer, addPdf_Transportation, addPdf_Extra})
  (Step3);
