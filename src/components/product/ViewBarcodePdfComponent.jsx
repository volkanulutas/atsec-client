import React,{useState, useEffect} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { FormGroup } from "reactstrap";
import store from '../../store';
import authHeader from "../../services/AuthHeader";
import axios from "axios";

import ProductService from "../../services/ProductService";

const ViewBarcodePdfComponent = props => {
  const [pdfFile, setPdfFile]=useState(props.pdfFile);
  
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    let st = store.getState();
   
    setPdfFile(st.barcodePdfView.value);

  });


  return (
    <>
    <FormGroup>
      <h4>PDF Ön İzleme</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {pdfFile&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!(pdfFile)&&<>Hiçbir PDF seçilmedi.</>}
      </div>
    </FormGroup>
    </>
  )
}

export default ViewBarcodePdfComponent;
