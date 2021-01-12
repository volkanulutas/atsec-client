import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import SelectSearch from 'react-select-search';

import RawProductService from '../../services/RawProductService';
import LocationService from '../../services/LocationService';
import DonorService from '../../services/DonorService';
import TissueTypeService from '../../services/TissueTypeService';
import DonorInstituteService from '../../services/DonorInstituteService';

import CreateDonorInstituteComponent from '../../components/donorinstitute/CreateDonorInstituteComponent';


class CreateRawProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            selectedApproveFiles: undefined,
            currentApproveFile: undefined,
            progressApprove: 0,
            messageApprove: "",
            approveFilesInfos: [],

            selectedTransferFiles: undefined,
            currentTransferFile: undefined,
            progressTransfer: 0,
            messageTransfer: "",
            transferFilesInfos: [],

            selectedTransportationFiles: undefined,
            currentTransportationFile: undefined,
            progressTransportation: 0,
            messageTransportation: "",
            transportationFilesInfos: [],

            selectedExtraFiles: undefined,
            currentExtraFile: undefined,
            progressExtra: 0,
            messageExtra: "",
            extraFilesInfos: [],

            showApproveFileModal: false,

            id: this.props.match.params.id,
            donor: {},
            donorInstitute: {},
            tissueType: {},
            location: {},
            statusName: '',
            issueTissueDate: '',
            arrivalDate: '',
            information: '',
            deleted: false,

            errors: [],

            product_LocationList: [],
            product_DonorList: [],
            product_StatusNameList: ["Karantina", "Red", "Kabul", "Atanmamış"],
            product_TissueTypeList: [],
            product_DonorInstituteList: [],
        }

        this.changeDonorHandler = this.changeDonorHandler.bind(this);
        this.changeDonorInstituteHandler = this.changeDonorInstituteHandler.bind(this);
        this.changetTissueTypeHandler = this.changetTissueTypeHandler.bind(this);
        this.changeIssueTissueDateHandler = this.changeIssueTissueDateHandler.bind(this);
        this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeInformationHandler = this.changeInformationHandler.bind(this);
        this.changeStatusNameHandler = this.changeStatusNameHandler.bind(this);

        this.handleApproveFileHideModal = this.handleApproveFileHideModal.bind(this);
        this.handleApproveFileShowModal = this.handleApproveFileShowModal.bind(this);
        

        this.saveProduct = this.saveProduct.bind(this);

        this.selectApproveFile = this.selectApproveFile.bind(this);
        this.selectTransferFile = this.selectTransferFile.bind(this);
        this.selectTransportationFile = this.selectTransportationFile.bind(this);
        this.selectExtraFile = this.selectExtraFile.bind(this);


        this.uploadApproveFile = this.uploadApproveFile.bind(this);
        this.uploadTransferFile = this.uploadTransferFile.bind(this);
        this.uploadTransportationFile = this.uploadTransportationFile.bind(this);
        this.uploadExtraFile = this.uploadExtraFile.bind(this);
  } 

    componentDidMount(){
        LocationService.getAllLocations().then(res=> {
            this.setState({product_LocationList: res.data});
         }).catch(ex => {
             console.error(ex);
         });
        DonorService.getAllDonors().then(res=> {
           this.setState({product_DonorList: res.data});
        }).catch(ex => {
            console.error(ex);
        });
        TissueTypeService.getAllTissueTypes().then(res=> {
            this.setState({product_TissueTypeList: res.data});
         }).catch(ex => {
             console.error(ex);
         });
         DonorInstituteService.getAllDonorInstitutes().then(res=> {
            this.setState({product_DonorInstituteList: res.data});
         }).catch(ex => {
             console.error(ex);
         });
        if(this.state.id === "_add"){
            return;
        }else {
            RawProductService.getRawProductById(this.state.id)
            .then(res => {
                let product = res.data;                
                let issueTissueDateStr = this.convertString(product.issueTissueDate);
                let arrivalDateStr = this.convertString(product.arrivalDate);
                this.setState({
                    donor: product.donor,
                    donorInstitute: product.donorInstitute,
                    tissueType: product.tissueType,
                    location: product.location,
                    issueTissueDate: issueTissueDateStr,
                    arrivalDate: arrivalDateStr,
                    information: product.information,
                    statusName: product.statusName,
                    deleted: product.deleted,
                });
                console.log('raw-product: ' + JSON.stringify(product));
            }).catch(ex=> {
                console.error(ex);
            });
        }  

         RawProductService.getFiles().then((response) => {
            this.setState({
              approveFilesInfos: response.data,
            });
          });
    }

    selectApproveFile(event) {
        this.setState({
          selectedApproveFiles: event.target.files,
        });
    }

    selectTransferFile(event) {
        this.setState({
          selectedTransferFiles: event.target.files,
        });
    }

    selectTransportationFile(event) {
        this.setState({
          selectedTransportationFiles: event.target.files,
        });
    }

    selectExtraFile(event) {
        this.setState({
          selectedExtraFiles: event.target.files,
        });
    }

    changeDonorHandler = (event) => {
        let donorParam = this.state.donor;
        donorParam.code = event.target.value;
        this.setState({donor:donorParam});
    }

    changeDonorInstituteHandler = (event) => {
        let donorInstituteParam = this.state.donorInstitute;
        donorInstituteParam.name = event.target.value;
        this.setState({donorInstitute:donorInstituteParam});
    }

    changetTissueTypeHandler = (event) => {
        let tissueTypeParam = this.state.tissueType;
        tissueTypeParam.name = event.target.value;
        this.setState({donorInstitute:tissueTypeParam});
    }

    changeIssueTissueDateHandler = (event) => {
        this.setState({issueTissueDate:event.target.value});
    } 

    changeArrivalDateHandler = (event) => {
        this.setState({arrivalDate:event.target.value});
    } 

    changeLocationNameHandler = (event) => {
        this.setState({location_Name:event.target.value});
    } 

    changeInformationHandler = (event) => {
        this.setState({information:event.target.value});
    }

    changeLocationHandler = (event) => {
        let locationParam = this.state.location;
        locationParam.name = event.target.value;
        this.setState({location:locationParam});
    }

    changeStatusNameHandler = (event) => {
        this.setState({statusName:event.target.value});
    }

    handleApproveFileShowModal(event) {
        event.preventDefault();
        this.setState({ showApproveFileModal: true });
    }

    handleApproveFileHideModal() {
        this.setState({ showApproveFileModal: false });
    }

    saveProduct = (event) => {
        event.preventDefault();
        var errors = [];
        if(this.state.donor === undefined || this.state.donor.code === ""){
            errors.push("donor.code");
        }
        if(this.state.arrivalDate === ""){
            errors.push("arrivalDate");
        }
        if(this.state.issueTissueDate === ""){
            errors.push("issueTissueDate");
        }
        if(!this.state.selectApproveFile){
            errors.push("approveFile");
        }
        if(!this.state.selectTransferFile){
            errors.push("transferFile");
        }
        if(!this.state.selectTransporterFile){
            errors.push("transfporterFile");
        }

       this.setState({errors: errors});
       if(errors.length > 0){
           return false;
       }



        let idParam = undefined;
        let statusParam = this.state.product_StatusNameList[0];
        let donorParam = this.state.product_DonorList[0].id;

        if(this.state.id !== "_add"){
            idParam = this.state.id;
        }
        if(this.state.status !== ""){
            statusParam = this.state.statusName;
        }
        if(this.state.donorCode !== ""){
            donorParam = this.state.donorCode;
        }

        let product = {id: idParam, 
            donor: this.state.donor, 
            donorInstitute: this.state.donorInstitute,
            issueTissueDate: this.state.issueTissueDate,
            arrivalDate: this.convertDate(this.state.arrivalDate),
            tissueType: this.convertDate(this.state.issueTissueDate),
            location: this.state.location, 
            statusName: this.state.statusName,
            definition: this.state.definition, 
            information: this.state.information, 
            deleted: this.state.deleted };

        console.log('product: ' + JSON.stringify(product));
        if(this.state.id === "_add"){
            RawProductService.createRawProduct(product).then(res => {
                    this.props.history.push('/rawroducts'); 
                }).catch(ex=> {
                    console.error(ex);
            });
        }else { 
            RawProductService.updateRawProduct(this.state.id, product).then(res => { 
                    this.props.history.push('/rawproducts');
                }).catch(ex=> {
                    console.error(ex);
            });
        }   
    }

    uploadApproveFile() {
        let currentApproveFile = this.state.selectedApproveFiles[0];
    
        this.setState({
          progressApprove: 0,
          currentApproveFile: currentApproveFile,
        });
    
        RawProductService.uploadApproveFiles(currentApproveFile, "RAW_APPROVE_FILES", (event) => {
          this.setState({
            progressApprove: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              messageApprove: response.data.message,
            });
            return RawProductService.getFiles("RAW_APPROVE_FILES");
          })
          .then((files) => {
            this.setState({
              approveFilesInfos: files.data,
            });
          })
          .catch(() => {
            this.setState({
              progressApprove: 0,
              messageApprove: "Could not upload the file!",
              currentApproveFile: undefined,
            });
          });
    
        this.setState({
          selectedApproveFiles: undefined,
        });
    }

    uploadTransferFile() {
        let currentTransferFile = this.state.selectedTransferFiles[0];
    
        this.setState({
          progressTransfer: 0,
          currentTransferFile: currentTransferFile,
        });
    
        RawProductService.upload(currentTransferFile, "RAW_TRANSFER_FILES",  (event) => {
          this.setState({
            progressTransfer: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              messageTransfer: response.data.message,
            });
            return RawProductService.getFiles("RAW_TRANSFER_FILES");
          })
          .then((files) => {
            this.setState({
                transferFilesInfos: files.data,
            });
          })
          .catch(() => {
            this.setState({
              progressTransfer: 0,
              messageTransfer: "Could not upload the file!",
              currentTransferFile: undefined,
            });
          });
    
        this.setState({
          selectedTransferFiles: undefined,
        });
    }

    uploadTransportationFile() {
        let currentTransportationFile = this.state.selectedTransportationFiles[0];
    
        this.setState({
          progressTransportation: 0,
          currentTransportationFile: currentTransportationFile,
        });
    
        RawProductService.upload(currentTransportationFile, "RAW_TRANSPORTATION_FILES", (event) => {
          this.setState({
            progressTransportation: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              messageTransportation: response.data.message,
            });
            return RawProductService.getFiles("RAW_TRANSPORTATION_FILES");
          })
          .then((files) => {
            this.setState({
                transportationFilesInfos: files.data,
            });
          })
          .catch(() => {
            this.setState({
              progressTransportation: 0,
              messageTransportation: "Could not upload the file!",
              currentTransportationFile: undefined,
            });
          });
    
        this.setState({
          selectedTransportationFiles: undefined,
        });
    }

    uploadExtraFile() {
        let currentExtraFile = this.state.selectedExtraFiles[0];
    
        this.setState({
          progressExtra: 0,
          currentExtraFile: currentExtraFile,
        });
    
        RawProductService.upload(currentExtraFile, "RAW_EXTRA_FILES", (event) => {
          this.setState({
            progressExtra: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              messageExtra: response.data.message,
            });
            return RawProductService.getFiles("RAW_EXTRA_FILES");
          })
          .then((files) => {
            this.setState({
              extraFilesInfos: files.data,
            });
          })
          .catch(() => {
            this.setState({
              progressExtra: 0,
              messageExtra: "Could not upload the file!",
              currentExtraFile: undefined,
            });
          });
    
        this.setState({
          selectedExtraFiles: undefined,
        });
    }

    cancel = (event) => {
        this.props.history.push('/rawproducts');
    }

    getTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Ham Ürün Ekle</h3>;
        }else{
            return <h3 className="text-center">Ham Ürün Güncelle</h3>
        }
    }

    getButtonText() {
        if(this.state.id === "_add"){
            return "Kaydet";
        } else {
            return "Güncelle";
        }
    }

    convertDate(stringDate){
        return new Date (stringDate).getTime();
    }

    convertString(dateLong){
        if(dateLong !== undefined){
            let date = new Date(dateLong);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) + "";
            let day = date.getDate() + "";
            let hour = date.getHours();
            let min = date.getMinutes();
            if(month.length === 1){
                month = "0" + month;
            }
            if(day.length === 1){
                day = "0" + day;
            }
            let d = year + "-" + month+"-" + day + "T" + hour + ":" + min;
            return d;
        }
    }

    hasError(key){
        return this.state.errors.indexOf(key) !== -1;
    }

    render() {

        
        const {
            selectedApproveFiles,
            currentApproveFile,
            progressApprove,
            messageApprove,
            approveFilesInfos,

            selectedTransferFiles,
            currentTransferFile,
            progressTransfer,
            messageTransfer,
            transferFilesInfos,

            selectedTransportationFiles,
            currentTransportationFile,
            progressTransportation,
            messageTransportation,
            transportationFilesInfos,

            selectedExtraFiles,
            currentExtraFile,
            progressExtra,
            messageExtra,
            extraFilesInfos,
          } = this.state;

        return (
            <div>
            <div className="container">
                <div className="row">


                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        {this.getTitle()}
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Donor ID:</label>
                                <input placeholder="Donor ID" name="donor_code"
                                className="form-control"
                                value={this.state.donor.code} onChange={this.changeDonorHandler} disabled/>
                            </div>
                            <div className="form-group">
                            <label>Gönderen Kurum: {this.state.donorInstitute.name}</label>
                            
                            <div className="">
                            <div className="" >
                                <select name="donorInstitute_Name" 
                                value={this.state.donorInstitute} onChange={this.changeDonorInstituteHandler}>
                                    {this.state.product_DonorInstituteList.map((option) => (
                                        <option value={option.name}>{option.id} - {option.name}</option>
                                    ))}
                                </select>
                                <button  className="btn btn-success at-margin-left"   onClick={this.handleApproveFileShowModal} >+</button>
                            </div>
                            </div>
                            </div>

                        
                            
                            <div className="form-group">
                                <label>Doku Çıkarım Tarihi:</label>
                                <input type="datetime-local" id="issueTissueDate" name="issueTissueDate" 
                                className={this.hasError("issueTissueDate") 
                                    ? "form-control is-invalid" 
                                    : "form-control"}
                                 value={this.state.issueTissueDate}  onChange={this.changeIssueTissueDateHandler} />
                                <div className={this.hasError("issueTissueDate") ? "inline-errormsg" : "hidden"}>
                                    Doku Çıkarım Tarihini girmelisiniz.
                                </div>
                            </div>




                            <div className="form-group">
                                <label>Merkeze Geliş Tarihi:</label>
                                <input type="datetime-local" id="arrivalDate" name="arrivalDate"
                                className={this.hasError("issueTissueDate") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                 value={this.state.arrivalDate} onChange={this.changeArrivalDateHandler} 
                                 />
                                <div className={this.hasError("arrivalDate") ? "inline-errormsg" : "hidden"}>
                                    Merkeze Geliş Tarihini girmelisiniz.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Doku Tipi: {this.state.tissueType.name}</label>
                                <select name="tissueType_Name" className="form-control" value={this.state.tissueType.name} onChange={this.changetTissueTypeHandler}>
                                {this.state.product_TissueTypeList.map((option) => (
                                    <option value={option.name}>{option.name}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Karantina Lokasyonu: {this.state.location.name}</label>
                                <select className="form-control"  value={this.state.location.name} onChange={this.changeLocationHandler}>
                                {this.state.product_LocationList.map((option) => (
                                    <option value={option.name}>{option.name}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Ek Bilgi:</label>
                                <input placeholder="Ek Bilgi" name="information" className="form-control"
                                value={this.state.information} onChange={this.changeInformationHandler} />
                            </div>

                            <div className="form-group">
                                <label>Durumu: {this.state.statusName}</label>
                                <select name="status" className="form-control"  value={this.state.statusName} onChange={this.changeStatusNameHandler}>
                                {this.state.product_StatusNameList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div >
                                <label>Onam Formu:</label>
                                <br/>

                                <div>
                                    {currentApproveFile && (
                                    <div className="progressApprove">
                                        <div
                                        className="progressApprove-bar progressApprove-bar-info progressApprove-bar-striped"
                                        role="progressApprovebar"
                                        aria-valuenow={progressApprove}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: progressApprove + "%" }}
                                        >
                                        {progressApprove}%
                                        </div>
                                    </div>
                                    )}

                                    <div>
                                        <label className="btn btn-default">
                                        <input type="file" onChange={this.selectApproveFile} 
                                           className={this.hasError("approveFile") 
                                           ? "form-control is-invalid" 
                                           : "form-control"}/>
                                        <div className={this.hasError("approveFile") ? "inline-errormsg" : "hidden"}>
                                            Onam Formunu yüklemelisiniz.
                                        </div>
                                    </label>
                                    </div>

                                    <button className="btn btn-success"
                                    disabled={!selectedApproveFiles}
                                    onClick={this.uploadApproveFile}
                                    >
                                    Onam Formu Yükle
                                    </button>

                                    <div className="alert alert-light" role="alert">
                                    {messageApprove}
                                    </div>

                                    <div className="card">
                                    <div className="card-header">Yüklenen Onam Formları</div>
                                    <ul className="list-group list-group-flush">
                                        {approveFilesInfos &&
                                        approveFilesInfos.map((file, index) => (
                                            <li className="list-group-item" key={index}>
                                            <a href={file.url}>{file.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tranfer Formu:</label>
                                <br/>
                                <div>
                                    {currentTransferFile && (
                                    <div className="progressApprove">
                                        <div
                                        className="progressApprove-bar progressApprove-bar-info progressApprove-bar-striped"
                                        role="progressApprovebar"
                                        aria-valuenow={progressTransfer}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: progressTransfer + "%" }}
                                        >
                                        {progressTransfer}%
                                        </div>
                                    </div>
                                    )}

                                    <div>
                                        <label className="btn btn-default">
                                        <input type="file" onChange={this.selectTransferFile} 
                                               className={this.hasError("approveFile") 
                                                        ? "form-control is-invalid" 
                                                        : "form-control"}/>
                                        
                                        <div className={this.hasError("approveFile") ? "inline-errormsg" : "hidden"}>
                                            Transfer Formunu yüklemelisiniz.
                                        </div>
                                        </label>
                                    </div>

                                    <button className="btn btn-success"
                                    disabled={!selectedTransferFiles}
                                    onClick={this.uploadTransferFile}
                                    >
                                    Transfer Formu Yükle
                                    </button>

                                    <div className="alert alert-light" role="alert">
                                    {messageTransfer}
                                    </div>

                                    <div className="card">
                                    <div className="card-header">Yüklenen Transfer Formları</div>
                                    <ul className="list-group list-group-flush">
                                        {transferFilesInfos &&
                                        transferFilesInfos.map((file, index) => (
                                            <li className="list-group-item" key={index}>
                                            <a href={file.url}>{file.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="form-group">
                                <label>Taşıma Verisi:</label>
                                <br/>
                                <div>
                                    {currentTransportationFile && (
                                    <div className="progressApprove">
                                        <div
                                        className="progressApprove-bar progressApprove-bar-info progressApprove-bar-striped"
                                        role="progressApprovebar"
                                        aria-valuenow={progressTransportation}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: progressTransportation + "%" }}
                                        >
                                        {progressTransportation}%
                                        </div>
                                    </div>
                                    )}


                                    <div>
                                        <label className="btn btn-default">
                                        <input type="file" onChange={this.selectTransportationFile}
                                             className={this.hasError("approveFile") 
                                             ? "form-control is-invalid" 
                                             : "form-control"} />
                                         <div className={this.hasError("approveFile") ? "inline-errormsg" : "hidden"}>
                                            Taşıma Formunu yüklemelisiniz.
                                        </div>
                                        </label>
                                    </div>
                                    

                                    <button className="btn btn-success text-center"
                                    disabled={!selectedTransportationFiles}
                                    onClick={this.uploadTransportationFile}
                                    >
                                    Taşıma Formu Yükle
                                    </button>

                                    <div className="alert alert-light" role="alert">
                                    {messageTransportation}
                                    </div>

                                    <div className="card">
                                    <div className="card-header">Yüklenen Taşıma Formları</div>
                                    <ul className="list-group list-group-flush">
                                        {transportationFilesInfos &&
                                        transportationFilesInfos.map((file, index) => (
                                            <li className="list-group-item" key={index}>
                                            <a href={file.url}>{file.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>



                            </div>

                            <div className="form-group">
                                <label>Ek Dokümanlar:</label>
                                <br/>
                                <div>
                                    {currentExtraFile && (
                                    <div className="progressApprove">
                                        <div
                                        className="progressApprove-bar progressApprove-bar-info progressApprove-bar-striped"
                                        role="progressApprovebar"
                                        aria-valuenow={progressExtra}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: progressExtra + "%" }}
                                        >
                                        {progressExtra}%
                                        </div>
                                    </div>
                                    )}

                                    <label className="btn btn-default">
                                    <input type="file" onChange={this.selectExtraFile} />
                                    </label>

                                    <button className="btn btn-success"
                                    disabled={!selectedExtraFiles}
                                    onClick={this.uploadExtraFile}
                                    >
                                    Ek Formlar Yükle
                                    </button>

                                    <div className="alert alert-light" role="alert">
                                    {messageExtra}
                                    </div>

                                    <div className="card">
                                    <div className="card-header">Yüklenen Ek Formlar</div>
                                    <ul className="list-group list-group-flush">
                                        {extraFilesInfos &&
                                        extraFilesInfos.map((file, index) => (
                                            <li className="list-group-item" key={index}>
                                            <a href={file.url}>{file.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>













                            </div>

                            <button className="btn btn-success" onClick={this.saveProduct.bind(this)}>{this.getButtonText()}</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>İptal</button>
                        </form>
                        


<div>

</div>



                       
      <Modal isOpen={this.state.showApproveFileModal} toggle={this.handleApproveFileShowModal}>
            <ModalHeader toggle={this.handleApproveFileShowModal}>Kurum Ekle</ModalHeader>
            <ModalBody>
                <CreateDonorInstituteComponent />
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={this.handleApproveFileHideModal}>Kapat</button>
            </ModalFooter>
      </Modal>    
       







                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default CreateRawProductComponent;