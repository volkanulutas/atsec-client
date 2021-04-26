import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

import RawProductService from "../../services/RawProductService";
import LocationService from "../../services/LocationService";
import DonorService from "../../services/DonorService";
import TissueTypeService from "../../services/TissueTypeService";
import DonorInstituteService from "../../services/DonorInstituteService";

import AddModal from "../util/modal/AddModal";

import CreateDonorInstituteComponent from "../../components/donorinstitute/CreateDonorInstituteComponent";

class CreateRawProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      isEditable: this.props.match.params.state === "view" ? false : true,
      multiple: false,

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

      donor: {},
      donorInstitute: [], // Typeahead needs array.
      tissueType: [], // Typeahead needs array.
      location: [], // Typeahead needs array.
      statusName: [], // Typeahead needs array.
      issueTissueDate: "",
      arrivalDate: "",
      information: "",
      deleted: false,

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
    };

    this.changeDonorHandler = this.changeDonorHandler.bind(this);
    this.changeIssueTissueDateHandler = this.changeIssueTissueDateHandler.bind(
      this
    );
    this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
    this.changeInformationHandler = this.changeInformationHandler.bind(this);

    this.saveProduct = this.saveProduct.bind(this);

    this.selectTransferFile = this.selectTransferFile.bind(this);
    this.selectTransportationFile = this.selectTransportationFile.bind(this);
    this.selectExtraFile = this.selectExtraFile.bind(this);

    this.uploadTransferFile = this.uploadTransferFile.bind(this);
    this.uploadTransportationFile = this.uploadTransportationFile.bind(this);
    this.uploadExtraFile = this.uploadExtraFile.bind(this);
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
      RawProductService.getRawProductById(this.state.id)
        .then((res) => {
          let product = res.data;
          let issueTissueDateStr = this.convertString(product.issueTissueDate);
          let arrivalDateStr = this.convertString(product.arrivalDate);

          let donorInstituteTemp = [product.donorInstitute];
          let tissueTypeTemp = [product.tissueType];
          let locationTemp = [product.location];
          let statusNameTemp = [product.statusName];

          this.setState({
            donor: product.donor,
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

  saveProduct = (event) => {
    event.preventDefault();
    var errors = [];
    if (this.state.donor === undefined || this.state.donor.code === "") {
      errors.push("donor.code");
    }
    if (this.state.arrivalDate === "") {
      errors.push("arrivalDate");
    }
    if (this.state.issueTissueDate === "") {
      errors.push("issueTissueDate");
    }
    if (!this.state.selectTransferFile) {
      errors.push("transferFile");
    }
    if (this.state.transferFilesInfos.length === 0) {
      errors.push("transfporterFile");
    }
    if (this.state.donorInstitute[0] === undefined) {
      errors.push("donorInstitute");
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

    let idParam = undefined;
    let statusParam = this.state.product_StatusNameList[0];
    let donorParam = this.state.product_DonorList[0].id;

    if (this.state.id !== "_add") {
      idParam = this.state.id;
    }
    if (this.state.status !== "") {
      statusParam = this.state.statusName;
    }
    if (this.state.donorCode !== "") {
      donorParam = this.state.donorCode;
    }

    let product = {
      id: idParam,
      donor: this.state.donor,
      donorInstitute: this.state.donorInstitute[0],
      issueTissueDate: this.state.issueTissueDate,
      arrivalDate: this.convertDate(this.state.arrivalDate),
      tissueType: this.convertDate(this.state.issueTissueDate),
      location: this.state.location[0],
      statusName: this.state.statusName[0],
      definition: this.state.definition,
      information: this.state.information,
      deleted: this.state.deleted,
    };

    console.log("product: " + JSON.stringify(product));
    if (this.state.id === "_add") {
      RawProductService.createRawProduct(product)
        .then((res) => {
          this.props.history.push("/rawroducts");
        })
        .catch((ex) => {
          console.error(ex);
        });
    } else {
      RawProductService.updateRawProduct(this.state.id, product)
        .then((res) => {
          this.props.history.push("/rawproducts");
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
  };

  uploadTransferFile() {
    let currentTransferFile = this.state.selectedTransferFiles[0];

    this.setState({
      progressTransfer: 0,
      currentTransferFile: currentTransferFile,
    });

    RawProductService.upload(
      currentTransferFile,
      "RAW_TRANSFER_FILES",
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
          messageTransfer: "Dosya sunucuya yüklenemedi!",
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

    RawProductService.upload(
      currentTransportationFile,
      "RAW_TRANSPORTATION_FILES",
      (event) => {
        this.setState({
          progressTransportation: Math.round(
            (100 * event.loaded) / event.total
          ),
        });
      }
    )
      .then((response) => {
        this.setState({
          messageTransportation: response.data.responseMessage,
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
          messageTransportation: "Dosya sunucuya yüklenemedi!",
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
          messageExtra: response.data.responseMessage,
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
          messageExtra: "Dosya sunucuya yüklenemedi!",
          currentExtraFile: undefined,
        });
      });

    this.setState({
      selectedExtraFiles: undefined,
    });
  }

  cancel = (event) => {
    this.props.history.push("/rawproducts");
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
    const { multiple } = this.state;

    const {
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
                    <label>Donör Id:</label>
                    <input
                      placeholder="Sistem tarafından üretilecektir."
                      name="donor_code"
                      className="form-control"
                      value={this.state.donor.code}
                      onChange={this.changeDonorHandler}
                      disabled
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
                        callback={this.delete}
                        disabled={!this.state.isEditable}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Doku Çıkarım Tarihi:</label>
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
                      Doku Çıkarım Tarihini girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Merkeze Geliş Tarihi:</label>
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
                      <button
                        className="btn btn-success width-select2"
                        /* TODO: onClick={this.}*/
                      >
                        +
                      </button>
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
                      <button
                        className="btn btn-success width-select2" /* TODO: onClick={this.}*/
                        disabled={!this.state.isEditable}
                      >
                        +
                      </button>
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

                  <div className="form-group">
                    <label>Tranfer Formu:</label>
                    <br />
                    <div>
                      {currentTransferFile && (
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
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
                          <input
                            type="file"
                            onChange={this.selectTransferFile}
                            className={
                              this.hasError("transferFile")
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />

                          <div
                            className={
                              this.hasError("transferFile")
                                ? "inline-errormsg"
                                : "hidden"
                            }
                          >
                            Transfer Formunu yüklemelisiniz.
                          </div>
                        </label>
                      </div>

                      <button
                        className="btn btn-success"
                        disabled={!selectedTransferFiles}
                        onClick={this.uploadTransferFile}
                      >
                        Transfer Formu Yükle
                      </button>

                      <div className="alert alert-light" role="alert">
                        {messageTransfer}
                      </div>

                      <div className="card">
                        <div className="card-header">
                          Yüklenen Transfer Formları
                        </div>
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
                    <br />
                    <div>
                      {currentTransportationFile && (
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progress"
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
                          <input
                            type="file"
                            onChange={this.selectTransportationFile}
                            className={
                              this.hasError("transportationFile")
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <div
                            className={
                              this.hasError("transportationFile")
                                ? "inline-errormsg"
                                : "hidden"
                            }
                          >
                            Taşıma Formunu yüklemelisiniz.
                          </div>
                        </label>
                      </div>

                      <button
                        className="btn btn-success text-center"
                        disabled={!selectedTransportationFiles}
                        onClick={this.uploadTransportationFile}
                      >
                        Taşıma Formu Yükle
                      </button>

                      <div className="alert alert-light" role="alert">
                        {messageTransportation}
                      </div>

                      <div className="card">
                        <div className="card-header">
                          Yüklenen Taşıma Formları
                        </div>
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
                    <br />
                    <div>
                      {currentExtraFile && (
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progress"
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

                      <button
                        className="btn btn-success"
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

                  <button
                    className="btn btn-success"
                    onClick={this.saveProduct.bind(this)}
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
