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


const ViewPdfComponent = props => {

  const [pdfFile, setPdfFile]=useState(null);
  
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const viewFile = store.getState();
  


  useEffect(() => {
    let st = store.getState();
    console.log("store: " + JSON.stringify( st));
    setPdfFile(st.pdfFile_Confirmation.value);

  });

  // for submit event
  // const [viewPdf, setViewPdf]=useState(null);

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

export default ViewPdfComponent;
