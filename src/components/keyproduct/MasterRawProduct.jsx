import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";

import { connect } from "react-redux";

import Step1 from "../keyproduct/Step1";
import Step2 from "../keyproduct/Step2";
import Step3 from "../keyproduct/Step3";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RawProductService from "../../services/RawProductService";
import LocationService from "../../services/LocationService";
import DonorService from "../../services/DonorService";
import TissueTypeService from "../../services/TissueTypeService";

import store from "../../store";

import { addCurrentRawProductId } from "../../actions";

// import styled from "styled-components";
import MultiStepProgressBar from "../keyproduct/MultiStepProgressBar";

class MasterRawProduct extends Component {
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,

      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable:
        this.props.match === undefined
          ? true
          : this.props.match.params.state === "view"
          ? false
          : true,
      multiple: false,

      // Step 1
      donor: [], // Typeahead needs array.
      tissueType: [], // Typeahead needs array.
      location: [], // Typeahead needs array.
      doctorName: "",
      arrivalDate: "",

      // Step 2
      statusName: [], // Typeahead needs array.
      issueTissueDate: "",

      information: "bilgi",
      signerInfo: "signerInfo",
      deleted: false,

      tissueCarryCase: false,
      sterialBag: false,
      dataLogger: false,
      temperature: 0,

      product_StatusNameList: ["Red", "Kabul"],
      product_LocationList: [],
      product_DonorList: [],
      product_TissueTypeList: [],

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

      errors: [],
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);

    this.hasError = this.hasError.bind(this);

    this.saveRawProduct = this.saveRawProduct.bind(this);

    this.addCreateDonorComponent = this.addCreateDonorComponent.bind(this);
    this.addCreateTissueTypeComponent =
      this.addCreateTissueTypeComponent.bind(this);
    this.addCreateLocationComponent =
      this.addCreateLocationComponent.bind(this);

    this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
    this.changeInformationHandler = this.changeInformationHandler.bind(this);
    this.changeSignerInfoHandler = this.changeSignerInfoHandler.bind(this);

    this.changeIssueTissueDateHandler =
      this.changeIssueTissueDateHandler.bind(this);

    this.handleTissueCarryCase = this.handleTissueCarryCase.bind(this);

    this.setDonor = this.setDonor.bind(this);
    this.setTissueType = this.setTissueType.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setDoctorName = this.setDoctorName.bind(this);

    this.setStatus = this.setStatus.bind(this);

    this.selectConfirmationFile = this.selectConfirmationFile.bind(this);
    this.selectTransferFile = this.selectTransferFile.bind(this);
    this.selectExtraFile = this.selectExtraFile.bind(this);

    this.uploadConfirmationFile = this.uploadConfirmationFile.bind(this);
    this.uploadTransferFile = this.uploadTransferFile.bind(this);
    this.uploadExtraFile = this.uploadExtraFile.bind(this);

    // Step3
    this.acceptRawProduct_accept = this.acceptRawProduct_accept.bind(this);
    this.acceptRawProduct_reject = this.acceptRawProduct_reject.bind(this);

    this.rejectRawProduct_accept = this.rejectRawProduct_accept.bind(this);
    this.rejectRawProduct_reject = this.rejectRawProduct_reject.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  saveRawProduct() {
    var isUpdate = false;
    if (this.state.id === "_add") {
      isUpdate = false;
    } else {
      isUpdate = true;
    }

    let product = {
      id: this.state.id,
      donor: this.state.donor[0],
      doctorName: this.state.doctorName,
      issueTissueDate: this.convertDate(this.state.issueTissueDate),
      tissueType: this.state.tissueType[0],
      location: this.state.location[0],
      arrivalDate: this.convertDate(this.state.arrivalDate),
      statusName: this.state.statusName[0],
      definition: this.state.definition,
      information: this.state.information,
      deleted: this.state.deleted,
      signerInfo: this.state.signerInfo,
      tissueCarryCase: this.state.tissueCarryCase,
      sterialBag: this.state.sterialBag,
      dataLogger: this.state.dataLogger,
      temperature: this.state.temperature,
    };

    if (isUpdate) {
      RawProductService.updateRawProduct(this.state.id, product)
        .then((res) => {
          this.state.id = res.data.id;
          const notify = () => toast("Ham ürün başarı ile güncellendi.");
          notify();
        })
        .catch((ex) => {
          const notify = () =>
            toast("Ham ürün güncellenemedi. Hata Kodu: CRT-RAW-02");
          notify();
        });
    } else {
      product.id = undefined;
      RawProductService.createRawProduct(product)
        .then((res) => {
          this.state.id = res.data.id;
          const notify = () => toast("Ham ürün başarı ile kaydedildi.");
          notify();
        })
        .catch((ex) => {
          const notify = () =>
            toast("Ham ürün kaydedilemedi. Hata Kodu: CRT-RAW-01");
          notify();
        });
    }
  }

  componentDidMount() {
    LocationService.getLocationsByType("NORMAL")
      .then((res) => {
        this.setState({ product_LocationList: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-03");
        notify();
      });
    DonorService.getAllDonors()
      .then((res) => {
        this.setState({ product_DonorList: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-04");
        notify();
      });
    TissueTypeService.getAllTissueTypes()
      .then((res) => {
        this.setState({ product_TissueTypeList: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-05");
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
          let arrivalDateStr = this.convertString(product.arrivalDate);
          let idTemp = product.id;
          let donorTemp = [product.donor];
          let tissueTypeTemp = [product.tissueType];
          let locationTemp = [product.location];
          let statusNameTemp = [product.statusName];
          let doctorNameTemp = product.doctorName;
          let signerInfoTemp = product.signerInfo;
          let tissueCarryCaseTemp = product.tissueCarryCase;
          let sterialBagTemp = product.sterialBag;
          let dataLoggerTemp = product.dataLogger;
          let temperatureTemp = product.temperature;
          let informationTemp = product.information;
          let definitionTemp = product.definition;

          this.setState({
            id: idTemp,
            donor: donorTemp,
            tissueType: tissueTypeTemp,
            location: locationTemp,
            doctorName: doctorNameTemp,
            definition: definitionTemp,
            issueTissueDate: issueTissueDateStr,
            arrivalDate: arrivalDateStr,
            statusName: statusNameTemp,
            deleted: product.deleted,
            tissueCarryCase: tissueCarryCaseTemp,
            sterialBag: sterialBagTemp,
            dataLogger: dataLoggerTemp,
            information: informationTemp,
            definition: definitionTemp,
            signerInfo: signerInfoTemp,
            temperature: temperatureTemp,
          });
        })
        .catch((ex) => {
          const notify = () =>
            toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-RAW-06");
          notify();
        });
    }
  }

  handleTissueCarryCase = (event) => {
    alert(event.target.checked);
    var isChecked = event.target.checked;
    var item = event.target.value;
    this.setState({ tissueCarryCase: isChecked });
  };

  handleSterialBag = (event) => {
    var isChecked = event.target.checked;
    var item = event.target.value;
    this.setState({ sterialBag: isChecked });
  };

  handleDataLogger = (event) => {
    var isChecked = event.target.checked;
    var item = event.target.value;
    this.setState({ dataLogger: isChecked });
  };

  changeTemperatureHandler = (event) => {
    this.setState({ temperature: event.target.value });
  };

  changeIssueTissueDateHandler = (event) => {
    this.setState({ issueTissueDate: event.target.value });
  };

  changeArrivalDateHandler = (event) => {
    this.setState({ arrivalDate: event.target.value });
  };

  acceptRawProduct_accept = (event) => {
    let statusTemp = [];
    statusTemp[0] = "Kabul";

    this.setState({ statusName: statusTemp });
    this.saveRawProduct();

    this.props.history.push("/rawproducts");
    /*
    RawProductService.getRawProductById(this.state.id)
      .then((res) => {
        let rawProduct = res.data;

        rawProduct.statusName = "Kabul";

        RawProductService.updateRawProduct(this.state.id, rawProduct)
          .then((res) => {
            this.props.history.push("/rawproducts");
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
      */
  };

  acceptRawProduct_reject = (event) => {
    // do nothing
  };

  rejectRawProduct_accept = (event) => {
    let statusTemp = [];
    statusTemp[0] = "Red";

    this.setState({ statusName: statusTemp });
    this.saveRawProduct();

    this.props.history.push("/rawproducts");
    /*
    RawProductService.getRawProductById(this.state.id)
      .then((res) => {
        let rawProduct = res.data;

        rawProduct.statusName = "Red";

        RawProductService.updateRawProduct(this.state.id, rawProduct)
          .then((res) => {
            this.props.history.push("/rawproducts");
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
      */
  };

  rejectRawProduct_reject = (event) => {
    // do nothing
  };

  changeInformationHandler = (event) => {
    this.setState({ information: event.target.value });
  };

  changeSignerInfoHandler = (event) => {
    this.setState({ signerInfo: event.target.value });
  };

  setDonor(data) {
    this.setState({ donor: data });
  }

  setTissueType(data) {
    this.setState({ tissueType: data });
  }

  setLocation(data) {
    this.setState({ location: data });
  }

  setDoctorName(data) {
    this.setState({ doctorName: data.target.value });
  }

  setStatus(data) {
    this.setState({ statusName: data });
  }

  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      id,
      information,
      selectedConfirmationFiles,
      selectedTransferFiles,
      selectedExtraFiles,
    } = this.state;

    var errors = [];
    if (selectedConfirmationFiles === undefined) {
      errors.push("confirmationFile");
    }
    if (selectedTransferFiles === undefined) {
      errors.push("transferFile");
    }
    if (selectedExtraFiles === undefined) {
      errors.push("extraFile");
    }
    if (this.state.signerInfo === "") {
      errors.push("signerInfo");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }
    // todoo update raw
    this.saveRawProduct();
    this.props.history.push("/rawproducts");
  };

  addCreateTissueTypeComponent() {
    window.location.reload();
  }

  addCreateDonorComponent() {
    window.location.reload();
  }

  addCreateLocationComponent() {
    window.location.reload();
  }

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // error handling
    if (currentStep === 1) {
      var errors = [];

      if (this.state.donor[0] === undefined) {
        errors.push("donor");
      }
      if (this.state.arrivalDate === "") {
        errors.push("arrivalDate");
      }
      if (this.state.location[0] === undefined) {
        errors.push("location");
      }
      if (this.state.issueTissueDate === "") {
        errors.push("issueTissueDate");
      }
      if (this.state.tissueType[0] === undefined) {
        errors.push("tissueType");
      }
      if (this.state.doctorName === "") {
        errors.push("doctorName");
      }
      this.setState({ errors: errors });
      if (errors.length > 0) {
        return false;
      }
      // todoo update raw
      this.saveRawProduct();
    }

    if (currentStep === 2) {
      var errors = [];

      if (this.state.statusName[0] === undefined) {
        errors.push("status");
      }

      if (this.state.statusName[0] !== "Kabul") {
        errors.push("statusNotCompatible");
      }
      if (this.state.tissueCarryCase === false) {
        errors.push("tissueCarryCase");
      }
      if (this.state.sterialBag === false) {
        errors.push("sterialBag");
      }
      if (this.state.dataLogger === false) {
        errors.push("dataLogger");
      }
      if (this.state.temperature === "" || this.state.temperature === 0) {
        errors.push("temperature");
      }

      this.setState({ errors: errors });
      if (errors.length > 0) {
        return false;
      }
      // todoo: updateraw
      this.saveRawProduct();
    }
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
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

  uploadTransferFile(event) {}

  uploadExtraFile(event) {}

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
      var minStr = min + "";
      if (minStr.length === 1) {
        minStr = "0" + minStr;
      }
      let d = year + "-" + month + "-" + day + "T" + hour + ":" + minStr;
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
                addCreateTissueTypeComponent={this.addCreateTissueTypeComponent}
                addCreateLocationComponent={this.addCreateLocationComponent}
                issueTissueDate={this.state.issueTissueDate}
                changeIssueTissueDateHandler={this.changeIssueTissueDateHandler}
                donor={this.state.donor}
                setDonor={this.setDonor}
                location={this.state.location}
                setLocation={this.setLocation}
                doctorName={this.state.doctorName}
                setDoctorName={this.setDoctorName}
                tissueType={this.state.tissueType}
                setTissueType={this.setTissueType}
                id={this.state.id}
                isEditable={this.state.isEditable}
                multiple={this.state.multiple}
                error={this.state.errors}
                hasError={this.hasError}
                product_DonorList={this.state.product_DonorList}
                product_TissueTypeList={this.state.product_TissueTypeList}
                product_LocationList={this.state.product_LocationList}
                // modal property
                callbackModalYes={this.state.callbackModalYes}
                callbackModalNo={this.state.callbackModalNo}
                email={this.state.email}
                arrivalDate={this.state.arrivalDate}
                changeArrivalDateHandler={this.changeArrivalDateHandler}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                id={this.state.id}
                isEditable={this.state.isEditable}
                multiple={this.state.multiple}
                error={this.state.errors}
                hasError={this.hasError}
                information={this.state.information}
                changeInformationHandler={this.changeInformationHandler}
                sterialBag={this.state.sterialBag}
                handleSterialBag={this.handleSterialBag}
                dataLogger={this.state.dataLogger}
                handleDataLogger={this.handleDataLogger}
                tissueCarryCase={this.state.tissueCarryCase}
                handleTissueCarryCase={this.handleTissueCarryCase}
                temperature={this.state.temperature}
                changeTemperatureHandler={this.changeTemperatureHandler}
                setStatus={this.setStatus}
                product_StatusNameList={this.state.product_StatusNameList}
                statusName={this.state.statusName}
                deleted={this.state.deleted}
              />

              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                signerInfo={this.state.signerInfo}
                id={this.state.id}
                isEditable={this.state.isEditable}
                multiple={this.state.multiple}
                error={this.state.errors}
                hasError={this.hasError}
                uploadConfirmationFile={this.uploadConfirmationFile}
                uploadTransferFile={this.uploadTransferFile}
                uploadExtraFile={this.uploadExtraFile}
                changeSignerInfoHandler={this.changeSignerInfoHandler}
                acceptRawProduct_accept={this.acceptRawProduct_accept}
                acceptRawProduct_reject={this.acceptRawProduct_reject}
                rejectRawProduct_accept={this.rejectRawProduct_accept}
                rejectRawProduct_reject={this.rejectRawProduct_reject}
                // methods
                selectConfirmationFile={this.selectConfirmationFile}
                selectTransferFile={this.selectTransferFile}
                selectExtraFile={this.state.selectExtraFile}
                selectedConfirmationFiles={this.state.selectedConfirmationFiles}
                currentConfirmationFile={this.state.currentConfirmationFile}
                progressConfirmation={this.state.progressConfirmation}
                messageConfirmation={this.state.messageTransfer}
                confirmationFilesInfos={this.state.confirmationFilesInfos}
                acceptRawProduct={this.acceptRawProduct}
                rejectRawProduct={this.rejectRawProduct}
                selectedTransferFiles={this.state.selectedTransferFiles}
                currentTransferFile={this.state.currentTransferFile}
                progressTransfer={this.state.progressTransfer}
                messageTransfer={this.state.messageTransfer}
                transferFilesInfos={this.state.transferFilesInfos}
                selectedExtraFiles={this.state.selectedExtraFiles}
                currentExtraFile={this.state.currentExtraFile}
                progressExtra={this.state.progressExtra}
                messageExtra={this.state.messageExtra}
                extraFilesInfos={this.state.extraFilesInfos}
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

function mapStateToProps(state) {
  return {
    currentRawProductId: state.id,
  };
}

export default connect(mapStateToProps, { addCurrentRawProductId })(
  MasterRawProduct
);
