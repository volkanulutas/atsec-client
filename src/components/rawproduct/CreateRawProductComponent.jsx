import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

import RawProductService from "../../services/RawProductService";
import LocationService from "../../services/LocationService";
import DonorService from "../../services/DonorService";
import TissueTypeService from "../../services/TissueTypeService";
import DonorInstituteService from "../../services/DonorInstituteService";
import AddModal from "../util/modal/AddModal";

class CreateRawProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable: this.props.match === undefined ? true : (this.props.match.params.state === "view" ? false : true),
      multiple: false,


      // Files 
      selectedFiles: [],
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      selectedFileType: [], // Typeahead needs array.
      product_FileList: ["Onam Formu", "Transfer Formu", "Taşıma Formu", "Ek Formu"],

    
      donor: [], // Typeahead needs array.
      donorInstitute: [], // Typeahead needs array.
      tissueType: [], // Typeahead needs array.
      location: [], // Typeahead needs array.
      statusName: [], // Typeahead needs array.
      issueTissueDate: "",
      arrivalDate: "",
      information: "",
      deleted: false,
 

      selectedFile: [], // Typeahead needs array.

      errors: [],

      // EnumRawProductStatus
      product_StatusNameList: [
        "Karantina",
        "Red",
        "Kabul",
        "Atanmamış",
        "Ön İşlem",
        "Tıbbi Atık",
      ],

      product_LocationList: [],
      product_DonorList: [],
      product_TissueTypeList: [],
      product_DonorInstituteList: [],
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };

    this.changeDonorHandler = this.changeDonorHandler.bind(this);
    this.changeIssueTissueDateHandler = this.changeIssueTissueDateHandler.bind(
      this
    );
    this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
    this.changeInformationHandler = this.changeInformationHandler.bind(this);

    this.save = this.save.bind(this);

    this.addCreateDonorInstituteComponent = this.addCreateDonorInstituteComponent.bind(this);
    this.addCreateDonorComponent = this.addCreateDonorComponent.bind(this);
    this.addCreateTissueTypeComponent = this.addCreateTissueTypeComponent.bind(this);
    this.addCreateLocationComponent = this.addCreateLocationComponent.bind(this);

    this.selectFile = this.selectFile.bind(this);
  }

  selectFile(event) {
    let file = event.target.files[0];
    this.setState({ selectedFiles: [...this.state.selectedFiles, file] });
  }

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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  componentDidMount() {
    LocationService.getAllLocations()
      .then((res) => {
        this.setState({ product_LocationList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
    DonorService.getAllDonors()
      .then((res) => {
        this.setState({ product_DonorList: res.data });
        console.log('customer: ' + JSON.stringify(this.state.product_DonorList));
      })
      .catch((ex) => {
        console.error(ex);
      });
    TissueTypeService.getAllTissueTypes()
      .then((res) => {
        this.setState({ product_TissueTypeList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
    DonorInstituteService.getAllDonorInstitutes()
      .then((res) => {
        this.setState({ product_DonorInstituteList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
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
          let donorInstituteTemp = [product.donorInstitute];
          let tissueTypeTemp = [product.tissueType];
          let locationTemp = [product.location];
          let statusNameTemp = [product.statusName];

          this.setState({
            id: idTemp,
            donor: donorTemp,
            donorInstitute: donorInstituteTemp,
            tissueType: tissueTypeTemp,
            location: locationTemp,
            issueTissueDate: issueTissueDateStr,
            arrivalDate: arrivalDateStr,
            information: product.information,
            statusName: statusNameTemp,
            deleted: product.deleted,
          });
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
  }

  changeDonorHandler = (event) => {
    let donorParam = this.state.donor;
    donorParam.code = event.target.value;
    this.setState({ donor: donorParam });
  };

  changeIssueTissueDateHandler = (event) => {
    this.setState({ issueTissueDate: event.target.value });
  };

  changeArrivalDateHandler = (event) => {
    this.setState({ arrivalDate: event.target.value });
  };

  changeInformationHandler = (event) => {
    this.setState({ information: event.target.value });
  };

  save = (event) => {
    event.preventDefault();
    var errors = [];
    let currentFile = this.state.selectedFiles[0];
  /*i
    if (this.state.selectedFiles.length === 0) {
      errors.push("fileList");
    }


  f (this.state.donor === undefined || this.state.donor.code === "") {
      errors.push("donor.code");
    }
    if (this.state.arrivalDate === "") {
      errors.push("arrivalDate");
    }
    if (this.state.issueTissueDate === "") {
      errors.push("issueTissueDate");
    }
    if (this.state.donorInstitute[0] === undefined) {
      errors.push("donorInstitute");
    }
    if (this.state.donor[0] === undefined) {
      errors.push("donor");
    }
    if (this.state.location[0] === undefined) {
      errors.push("location");
    }
    if (this.state.tissueType[0] === undefined) {
      errors.push("tissueType");
    }

    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }
    let statusParam = this.state.product_StatusNameList[0];
    if (this.state.status !== "") {
      statusParam = this.state.statusName;
    }
    if("_add" === this.state.id) {
      this.state.id = null;
    }*/

 

    


    let product = {
      id: this.state.id,
      donor: this.state.donor[0],
      donorInstitute: this.state.donorInstitute[0],
      issueTissueDate: this.state.issueTissueDate,
      arrivalDate: this.convertDate(this.state.arrivalDate),
      issueTissueDate: this.convertDate(this.state.issueTissueDate),
      tissueType: this.state.tissueType[0],
      location: this.state.location[0],
      statusName: this.state.statusName[0],
      definition: this.state.definition,
      information: this.state.information,
      deleted: this.state.deleted,
    };

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    if (this.state.id === null) {
      /*
      RawProductService.createRawProduct(product)
        .then((res) => {
          this.props.history.push("/rawroducts");
        })
        .catch((ex) => {
          console.error(ex);
        });
        */
    } else {
      RawProductService.updateRawProduct(this.state.id, product)
        .then((res) => {
          this.props.history.push("/rawproducts");
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
    // If opened as modal
    if(this.state.callbackModalYes){
        this.state.callbackModalYes();
    }
  };

  cancel = (event) => {
    // If opened as modal
    if(this.state.callbackModalNo){
        this.state.callbackModalNo();
    } else {
        this.props.history.push('/rawproducts');
    } 
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Ham Ürün Ekle</h3>;
    } else {
      return <h3 className="text-center">Ham Ürün Güncelle</h3>;
    }
  }

  getButtonText() {
    if (this.state.id === "_add") {
      return "Kaydet";
    } else {
      return "Güncelle";
    }
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

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      multiple
    } = this.state;


    return (
      <div>
<div className="container">
  <div className="row">
    <div className="card col-md-6 offset-md-3 offset-md-3">
      {this.getTitle()} -- {this.state.selectedFiles.length}
      <div className="card-body">
        <form>
          <div className="form-group">
          <label>
              Donor:{" "}
              {this.state.donor[0] === undefined
                ? "Seçilmedi"
                : this.state.donor[0].code}
            </label>
   
            <Typeahead
                multiple={multiple}
                id="select-donor"
                onChange={(selected) => {
                  this.setState({ donor: selected });
                }}
                labelKey="code"
                options={this.state.product_DonorList}
                placeholder="Donor Seç..."
                selected={this.state.donor}
                disabled={!this.state.isEditable || !(this.state.id === "_add" || this.state.id === null)}
              />
          </div>

          <div className="form-group">
            <label>
              Gönderen Kurum:{" "}
              {this.state.donorInstitute[0] === undefined
                ? "Seçilmedi"
                : this.state.donorInstitute[0].name}
            </label>
            <div>
              <Typeahead
                multiple={multiple}
                id="select-donorInstitute"
                onChange={(selected) => {
                  this.setState({ donorInstitute: selected });
                }}
                labelKey="name"
                options={this.state.product_DonorInstituteList}
                placeholder="Gönderen Kurumu Seç..."
                selected={this.state.donorInstitute}
                disabled={!this.state.isEditable}
              />
              <div
                className={
                  this.hasError("donorInstitute")
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Gönderen Kurumu girmelisiniz.
              </div>
              <AddModal
                style={{ marginRight: "5px" }}
                initialModalState={false}
                component={"CreateDonorInstituteComponent"}
                callback={this.addCreateDonorInstituteComponent}
                isEditable ={this.state.isEditable}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Doku Çıkarım Zamanı (Saat ve Tarih):</label>
            <input
              type="datetime-local"
              id="issueTissueDate"
              name="issueTissueDate"
              className={
                this.hasError("issueTissueDate")
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.issueTissueDate}
              onChange={this.changeIssueTissueDateHandler}
              disabled={!this.state.isEditable}
            />
            <div
              className={
                this.hasError("issueTissueDate")
                  ? "inline-errormsg"
                  : "hidden"
              }
            >
              Doku Çıkarım Zamanını girmelisiniz.
            </div>
          </div>

          <div className="form-group">
            <label>Merkeze Geliş Zamanı (Tarih ve Saat):</label>
            <input
              type="datetime-local"
              id="arrivalDate"
              name="arrivalDate"
              className={
                this.hasError("issueTissueDate")
                  ? "form-control is-invalid"
                  : "form-control"
              }
              value={this.state.arrivalDate}
              onChange={this.changeArrivalDateHandler}
              disabled={!this.state.isEditable}
            />
            <div
              className={
                this.hasError("arrivalDate")
                  ? "inline-errormsg"
                  : "hidden"
              }
            >
              Merkeze Geliş Tarihini girmelisiniz.
            </div>
          </div>
          <div className="form-group">
            <label>
              Doku Tipi:{" "}
              {this.state.tissueType[0] === undefined
                ? "Seçilmedi"
                : this.state.tissueType[0].name}{" "}
            </label>
            <div>
              <Typeahead
                multiple={multiple}
                id="select-tissueType"
                onChange={(selected) => {
                  this.setState({ tissueType: selected });
                }}
                labelKey="name"
                options={this.state.product_TissueTypeList}
                placeholder="Doku Tipini Seçiniz..."
                selected={this.state.tissueType}
                disabled={!this.state.isEditable}
              />
              <div
                className={
                  this.hasError("tissueType")
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Doku Tipini girmelisiniz.
              </div>
              <AddModal
                style={{ marginRight: "5px" }}
                initialModalState={false}
                component={"CreateTissueTypeComponent"}
                callback={this.addCreateTissueTypeComponent}
                isEditable ={this.state.isEditable}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Karantina Lokasyonu:{" "}
              {this.state.location[0] === undefined
                ? "Seçilmedi"
                : this.state.location[0].name}
            </label>
            <div>
              <Typeahead
                multiple={multiple}
                id="select-location"
                onChange={(selected) => {
                  this.setState({ location: selected });
                }}
                labelKey="name"
                options={this.state.product_LocationList}
                placeholder="Karantina Lokasyonunu Seç..."
                selected={this.state.location}
                disabled={!this.state.isEditable}
              />
              <div
                className={
                  this.hasError("location")
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Karantina Lokasyonunu girmelisiniz.
              </div>
              <AddModal
                style={{ marginRight: "5px" }}
                initialModalState={false}
                component={"CreateLocationComponent"}
                callback={this.addCreateLocationComponent}
                isEditable = {this.state.isEditable}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Ek Bilgi:</label>
            <input
              placeholder="Ek Bilgi"
              name="information"
              className="form-control"
              value={this.state.information}
              onChange={this.changeInformationHandler}
              disabled={!this.state.isEditable}
            />
          </div>

          <div className="form-group">
            <label>
              Durumu:{" "}
              {this.state.statusName[0] === undefined
                ? "Seçilmedi..."
                : this.state.statusName[0]}
            </label>
            <Typeahead
              multiple={multiple}
              id="select-status"
              onChange={(selected) => {
                this.setState({ statusName: selected });
              }}
              options={this.state.product_StatusNameList}
              placeholder="Durumu Seç..."
              selected={this.state.statusName}
              disabled={!this.state.isEditable}
            />
          </div>

         {/* Begin of Files */}
          <div>
          <div>
              <label>Form Ekle:</label>
                <Typeahead
                  multiple={false}
                  id="select-status"
                  onChange={(selected) => {
                    this.setState({ selectedFileType: selected });
                  }}
                  options={this.state.product_FileList}
                  placeholder="Form Türü Seç..."
                  selected={this.state.selectedFileType}
                  disabled= {false}
                  // TODO: disabled={!this.state.isEditable}
                />  
                <div
                    className={
                      this.hasError("fileList")
                        ? "inline-errormsg"
                        : "hidden"
                }
              ></div>
          </div>


        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Yükle
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <div className="card-header">Yüklenen Form Listesi</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
   
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name} -  {file.dataType} </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* End of Files */}

      <input
          type="file"
          multiple  //To select multiple files
          onChange={(e) => this.selectFile(e)}
        />




          <button
            className="btn btn-success"
            onClick={this.save.bind(this)}
            disabled={!this.state.isEditable}
          >
            {this.getButtonText()}
          </button>
          <button
            className="btn btn-danger"
            onClick={this.cancel.bind(this)}
            style={{ marginLeft: "10px" }}
          >
            İptal
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>

    
 );
  }
}

export default CreateRawProductComponent;