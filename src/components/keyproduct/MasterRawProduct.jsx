import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";

import {connect} from 'react-redux';

import Step1 from "../keyproduct/Step1";
import Step2 from "../keyproduct/Step2";
import Step3 from "../keyproduct/Step3";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RawProductService from "../../services/RawProductService";
import LocationService from "../../services/LocationService";
import DonorService from "../../services/DonorService";
import TissueTypeService from "../../services/TissueTypeService";
import DonorInstituteService from "../../services/DonorInstituteService";

import store from '../../store';

import { addCurrentRawProductId} from '../../actions';

// import styled from "styled-components";
import MultiStepProgressBar from "../keyproduct/MultiStepProgressBar";

class MasterRawProduct extends Component {
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,

      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable: this.props.match === undefined ? true : (this.props.match.params.state === "view" ? false : true),
      multiple: false,

      // Step 1
      donor: [], // Typeahead needs array.
      donorInstitute: [], // Typeahead needs array.
      tissueType: [], // Typeahead needs array.
      location: [], // Typeahead needs array.
      doctorName: "",
      tissueTakenType: "",
      
      // Step 2
      statusName: [], // Typeahead needs array.
      issueTissueDate: "",
      arrivalDate: "",
      information: "volkan",
      deleted: false,

      product_StatusNameList: [
        "Red",
        "Kabul",
      ],
      product_LocationList: [],
      product_DonorList: [],
      product_TissueTypeList: [],
      product_DonorInstituteList: [],


      // Step 3 - Files
      selectedConfirmationFiles: undefined,
      currentConfirmationFile: undefined,
      progressConfirmation: 0,
      messageConfirmation: "",
      confirmationFilesInfos: [],

      selectedTransferFiles: undefined,
      currentTransferFile: undefined,
      progressTransfer: 0,
      messageTransfer: "",
      transferFilesInfos: [],

      selectedExtraFiles: undefined,
      currentExtraFile: undefined,
      progressExtra: 0,
      messageExtra: "",
      extraFilesInfos: [],

      signer:"",
      signDate: "",

      errors: [],
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);

    this.hasError =  this.hasError.bind(this);

    this.saveRawProduct =  this.saveRawProduct.bind(this);
    

    this.addCreateDonorInstituteComponent = this.addCreateDonorInstituteComponent.bind(this);
    this.addCreateDonorComponent = this.addCreateDonorComponent.bind(this);
    this.addCreateTissueTypeComponent = this.addCreateTissueTypeComponent.bind(this);
    this.addCreateLocationComponent = this.addCreateLocationComponent.bind(this);

    this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
    this.changeInformationHandler = this.changeInformationHandler.bind(this);
    this.changeIssueTissueDateHandler = this.changeIssueTissueDateHandler.bind(this);

    this.setDonor = this.setDonor.bind(this);
    this.setDonorInstitute = this.setDonorInstitute.bind(this);
    this.setTissueType = this.setTissueType.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setDoctorName = this.setDoctorName.bind(this);
    this.setTissueTakenType = this.setTissueTakenType.bind(this);

    this.setStatus = this.setStatus.bind(this);

    this.selectConfirmationFile = this.selectConfirmationFile.bind(this);
    this.selectTransferFile = this.selectTransferFile.bind(this);
    this.selectExtraFile = this.selectExtraFile.bind(this);

    this.uploadConfirmationFile = this.uploadConfirmationFile.bind(this);
    this.uploadTransferFile = this.uploadTransferFile.bind(this);
    this.uploadExtraFile = this.uploadExtraFile.bind(this);

    this.changeSignerHandler = this.changeSignerHandler.bind(this);
    this.changeSignDateHandler = this.changeSignDateHandler.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  saveRawProduct(isUpdate){
    let product = {
      id:  this.state.id,
      donor: this.state.donor[0],
      donorInstitute: this.state.donorInstitute[0],
      doctorName: this.state.doctorName,
      tissueTakenType: this.state.TissueTakenType,
      issueTissueDate: this.convertDate(this.state.issueTissueDate),
      tissueType: this.state.tissueType[0],
      location: this.state.location[0],


      arrivalDate: this.convertDate(this.state.arrivalDate),
      statusName: this.state.statusName[0],
      definition: this.state.definition,
      information: this.state.information,
      deleted: this.state.deleted,
   
      
      signer: this.state.signer,
      signDate:  this.convertDate(this.state.signDate),
    };

    if(isUpdate){
      RawProductService.updateRawProduct(this.state.id, product)
      .then((res) => {
        this.state.id = res.data.id;
        const notify = () => toast("Ham ürün başarı ile güncellendi.");
        notify();
      })
      .catch((ex) => {
        const notify = () => toast("Ham ürün güncellenemedi. Hata Kodu: CRT-RAW-02");
        notify();
      }); 
    }
    else{
      product.id =undefined;
      RawProductService.createRawProduct(product)
      .then((res) => {
        this.state.id = res.data.id;
        const notify = () => toast("Ham ürün başarı ile kaydedildi.");
        notify();
      })
      .catch((ex) => {
        const notify = () => toast("Ham ürün kaydedilemedi. Hata Kodu: CRT-RAW-01");
        notify();
      }); 
    }
  }

  componentDidMount() {
    LocationService.getAllLocations()
      .then((res) => {
        this.setState({ product_LocationList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-03");
        notify();
      });
    DonorService.getAllDonors()
      .then((res) => {
        this.setState({ product_DonorList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-04");
        notify();
      });
    TissueTypeService.getAllTissueTypes()
      .then((res) => {
        this.setState({ product_TissueTypeList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-05");
        notify();
      });
    DonorInstituteService.getAllDonorInstitutes()
      .then((res) => {
        this.setState({ product_DonorInstituteList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-06");
        notify();
      });
    if (this.state.id === "_add") {
       return;
    } else {

      RawProductService.getFiles(this.state.id).then((response) => {
        this.setState({
          fileInfos: response.data,
        });
      });

      RawProductService.getRawProductById(this.state.id)
        .then((res) => {
        
          let product = res.data;
          let issueTissueDateStr = this.convertString(product.issueTissueDate);
          alert(issueTissueDateStr)
          let arrivalDateStr = this.convertString(product.arrivalDate);
          let idTemp = product.id;

          let donorTemp = [product.donor];
          let donorInstituteTemp = [product.donorInstitute];
          let tissueTypeTemp = [product.tissueType];
          let locationTemp = [product.location];
          let statusNameTemp = [product.statusName];
          let doctorNameTemp = product.doctorName;
          let tissueTakenTypeTemp = product.tissueTakenType;
          let signerTemp = product.signer;
          let signerDateTemp = product.signerDate;

          this.setState({
            id: idTemp,
            donor: donorTemp,
            donorInstitute: donorInstituteTemp,
            tissueType: tissueTypeTemp,
            location: locationTemp,
            doctorName: doctorNameTemp,
            tissueTakenType: tissueTakenTypeTemp,
            issueTissueDate: issueTissueDateStr,
            arrivalDate: arrivalDateStr,
            signer: signerTemp,
            signerDate: signerDateTemp,
            information: product.information,
            statusName: statusNameTemp,
            deleted: product.deleted,
          });
        })
        .catch((ex) => {
          const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-07");
          notify();
        });
    }
  }

  changeIssueTissueDateHandler = (event) => {
    this.setState({ issueTissueDate: event.target.value });
  };

  changeArrivalDateHandler = (event) => {
    this.setState({ arrivalDate: event.target.value });
  };

  changeSignDateHandler = (event) => {
    this.setState({ signDate: event.target.value });
  };

  changeSignerHandler = (event) => {
    this.setState({ signer: event.target.value });
  };

  changeInformationHandler = (event) => {
    this.setState({ information: event.target.value });
  };

  setDonor(data) {
    this.setState({ donor: data});
  }

  setDonorInstitute(data) {
    this.setState({ donorInstitute: data});
  }

  setTissueType(data) {
    console.log("tissueType:", data);
    this.setState({ tissueType: data});
  }

  setLocation(data) {
    this.setState({ location: data});
  }

  setDoctorName(data) {
    this.setState({ doctorName: data.target.value});
  }
  
  setTissueTakenType(data) {
    console.log("tissueTakenType:", data);

    this.setState({ tissueTakenType: data});
  }

  setStatus(data) {
    console.log("statusName:", data);
    this.setState({ statusName: data});
  }
  
  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // Trigger an alert on form submission
  handleSubmit = event => {
    event.preventDefault();
    const { id, information, selectedConfirmationFiles, selectedTransferFiles,
       selectedExtraFiles } = this.state;

    var errors = [];
    /*if (selectedConfirmationFiles === undefined ) {
      errors.push("confirmationFile");
    }
    if(selectedTransferFiles === undefined) {
      errors.push("transferFile");
    }
    if(selectedExtraFiles === undefined) {
      errors.push("extraFile");
    }*/
    if (this.state.signDate === "") {
        errors.push("signDate");
    }
    if (this.state.signer === "") {
        errors.push("signer");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }
    // todoo update raw   
    this.saveRawProduct(true); 
    this.props.history.push('/rawproducts'); 
  };

  addCreateTissueTypeComponent(){
    window.location.reload();
  }

  addCreateDonorComponent(){
    window.location.reload();
  }

  addCreateDonorInstituteComponent() {
    window.location.reload();
  }

  addCreateLocationComponent(){
    window.location.reload();
  }

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // error handling
    if(currentStep === 1) {
      
      var errors = [];
      
      if(this.state.donor[0] === undefined) {
        errors.push("donor");
      }
      if (this.state.donorInstitute[0] === undefined) {
        errors.push("donorInstitute");
      }
      if (this.state.location[0] === undefined) {
        errors.push("location");
      }
      if (this.state.issueTissueDate === "") {
         errors.push("issueTissueDate");
      }
      if (this.state.tissueTakenType === "") {
        errors.push("tissueTakenType");
      }
      if (this.state.tissueType[0] === undefined) {
        errors.push("tissueType");
      }
      if(this.state.doctorName === ""){
        errors.push("doctorName")
      }
      
      this.setState({ errors: errors });
      if (errors.length > 0) {
        return false;
      }

      // todoo update raw
      this.saveRawProduct(false);
    }

    if(currentStep === 2){
      
      var errors = [];
       
      if(this.state.statusName[0] === undefined ) {
        errors.push("status");
      }

      if(this.state.statusName[0] !== "Kabul" ) {
        errors.push("statusNotCompatible");  
      }
      if (this.state.arrivalDate === "") {
        errors.push("arrivalDate");
      }
      this.setState({ errors: errors });
      if (errors.length > 0) {
        return false;
      }
     // todoo: updateraw 
     this.saveRawProduct(true);  
    }
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left" onClick={this._prev}>
          Geri
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <Button color="primary float-right" onClick={this._next}>
          İleri
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 2) {
      return <Button color="primary float-right">Kaydet</Button>;
    }
    // ...else render nothing
    return null;
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  uploadConfirmationFile() {
    let currentConfirmationFile = this.state.selectedConfirmationFiles;
    let rawProductId = this.state.id;


    this.setState({
      progressTransfer: 0,
      currentConfirmationFile: currentConfirmationFile,
    });

    RawProductService.upload(
      currentConfirmationFile,
      "RAW_CONFIRMATION_FILES",
      rawProductId,
      (event) => {
        this.setState({
          progressTransfer: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        this.setState({
          messageTransfer: response.data.responseMessage,
        });
        return RawProductService.getFiles("RAW_CONFIRMATION_FILES");
      })
      .then((files) => {
        this.setState({
          confirmationFilesInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progressConfirmation: 0,
          messageConfirmation: "Dosya sunucuya yüklenemedi!",
          currentConfirmationile: undefined,
        });
      });

    this.setState({
      selectedTransferFiles: undefined,
    });

  }

  uploadTransferFile(event) {
  }

  uploadExtraFile(event) {
  }

  selectConfirmationFile(event) {
    event.preventDefault();
    this.setState({
      selectedConfirmationFiles: event.target.files[0],
    });
  }

  selectTransferFile(event) {
    this.setState({
      selectedTransferFiles: event.target.files,
    });
  }

  selectExtraFile(event) {
    this.setState({
      selectedExtraFiles: event.target.files,
    });
  }

  convertDate(stringDate) {
    return new Date(stringDate).getTime();
  }

  convertString(dateLong) {
    if (dateLong !== undefined) {
      let date = new Date(dateLong);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 + "";
      let day = date.getDate() + "";
      let hour = date.getHours();
      let min = date.getMinutes();
      if (month.length === 1) {
        month = "0" + month;
      }
      if (day.length === 1) {
        day = "0" + day;
      }
      let d = year + "-" + month + "-" + day + "T" + hour + ":" + min;
      return d;
    }
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
           <ToastContainer />
          <Card>
            <CardHeader>Ham Ürün</CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              <CardText />

              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}

                addCreateDonorInstituteComponent = {this.addCreateDonorInstituteComponent}
                addCreateTissueTypeComponent = {this.addCreateTissueTypeComponent}
                addCreateLocationComponent = {this.addCreateLocationComponent}

                issueTissueDate={this.state.issueTissueDate}
                changeIssueTissueDateHandler = {this.changeIssueTissueDateHandler}

                donor={this.state.donor}
                setDonor = {this.setDonor}

                donorInstitute={this.state.donorInstitute}
                setDonorInstitute = {this.setDonorInstitute}
          
                location={this.state.location}
                setLocation = {this.setLocation}
          
                doctorName = {this.state.doctorName}
                setDoctorName = {this.setDoctorName}
              
                tissueType={this.state.tissueType}
                setTissueType = {this.setTissueType}

                tissueTakenType={this.state.tissueTakenType}
                setTissueTakenType = {this.setTissueTakenType}

                id = {this.state.id}
                isEditable = {this.state.isEditable}
                multiple = {this.state.multiple}
                error = {this.state.errors}
                hasError = {this.hasError}

                product_DonorList={this.state.product_DonorList}
                product_DonorInstituteList={this.state.product_DonorInstituteList}
                product_TissueTypeList={this.state.product_TissueTypeList}
                product_LocationList={this.state.product_LocationList}
            
                // modal property
                callbackModalYes={this.state.callbackModalYes}
                callbackModalNo={this.state.callbackModalNo}

                email={this.state.email}

              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
      

                id = {this.state.id}
                isEditable = {this.state.isEditable}
                multiple = {this.state.multiple}
                error = {this.state.errors}
                hasError = {this.hasError}

                arrivalDate={this.state.arrivalDate}
                changeArrivalDateHandler = {this.changeArrivalDateHandler}

                information={this.state.information}
                changeInformationHandler = {this.changeInformationHandler}
                
                setStatus = {this.setStatus}

                product_StatusNameList={this.state.product_StatusNameList}
                statusName={this.state.statusName}

                deleted={this.state.deleted}
              />

              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
          
                signer={this.state.signer}
                signDate={this.state.signDate}

                id = {this.state.id}
                isEditable = {this.state.isEditable}
                multiple = {this.state.multiple}
                error = {this.state.errors}
                hasError = {this.hasError}

                uploadConfirmationFile = {this.uploadConfirmationFile}
                uploadTransferFile = {this.uploadTransferFile}
                uploadExtraFile = {this.uploadExtraFile}

                changeSignerHandler={this.changeSignerHandler}
                changeSignDateHandler={this.changeSignDateHandler}

                // methods
                selectConfirmationFile = {this.selectConfirmationFile}
                selectTransferFile = {this.selectTransferFile}
                selectExtraFile = {this.state.selectExtraFile}


                selectedConfirmationFiles = {this.state.selectedConfirmationFiles}
                currentConfirmationFile = {this.state.currentConfirmationFile}
                progressConfirmation = {this.state.progressConfirmation}
                messageConfirmation= {this.state.messageTransfer}
                confirmationFilesInfos = {this.state.confirmationFilesInfos}


                selectedTransferFiles = {this.state.selectedTransferFiles}
                currentTransferFile = {this.state.currentTransferFile}
                progressTransfer = {this.state.progressTransfer}
                messageTransfer = {this.state.messageTransfer}
                transferFilesInfos = {this.state.transferFilesInfos}
          
                selectedExtraFiles = {this.state.selectedExtraFiles}
                currentExtraFile = {this.state.currentExtraFile}
                progressExtra = {this.state.progressExtra}
                messageExtra = {this.state.messageExtra}
                extraFilesInfos = {this.state.extraFilesInfos}

                />
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

function mapStateToProps(state){
  return {
      currentRawProductId: state.id,
  }
}

export default connect(mapStateToProps, 
  {addCurrentRawProductId})
  (MasterRawProduct);