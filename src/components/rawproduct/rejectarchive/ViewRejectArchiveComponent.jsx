import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import RawProductService from "../../../services/RawProductService";
import LocationService from "../../../services/LocationService";
import DonorService from "../../../services/DonorService";
import TissueTypeService from "../../../services/TissueTypeService";
import DonorInstituteService from "../../../services/DonorInstituteService";

import CreateDonorInstituteComponent from "../../donorinstitute/CreateDonorInstituteComponent";

class ViewRejectArchiveComponent extends Component {
  constructor(props) {
    super(props);

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
      donorInstitute: [],
      tissueType: {},
      location: {},
      statusName: "",
      issueTissueDate: "",
      arrivalDate: "",
      information: "",
      deleted: false,

      errors: [],

      product_LocationList: [],
      product_DonorList: [],
      product_StatusNameList: ["Karantina", "Red", "Kabul", "Atanmamış"],
      product_TissueTypeList: [],
      product_DonorInstituteList: [],
    };
  }

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
          this.setState({
            donor: product.donor,
            donorInstitute: donorInstituteTemp,
            tissueType: product.tissueType,
            location: product.location,
            issueTissueDate: issueTissueDateStr,
            arrivalDate: arrivalDateStr,
            information: product.information,
            statusName: product.statusName,
            deleted: product.deleted,
          });
          console.log("raw-product: " + JSON.stringify(product));
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
    RawProductService.getFiles().then((response) => {
      this.setState({
        approveFilesInfos: response.data,
      });
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

  hasError(key) {
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
              Reddedilmiş Ham Ürün Detayı
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Donor ID:</label>
                    <input
                      placeholder="Donor ID"
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
                        id="select-donorInstitute"
                        onChange={(selected) => {
                          this.setState({ donorInstitute: selected });
                        }}
                        labelKey="name"
                        options={this.state.product_DonorInstituteList}
                        placeholder="Donor Kurumu Seç..."
                        disabled
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
                      disabled
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
                      disabled
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
                    <label>Doku Tipi: {this.state.tissueType.name}</label>
                    <div>
                      <Typeahead
                        id="select-donorInstitute"
                        onChange={this.changetTissueTypeHandler}
                        labelKey="name"
                        options={this.state.product_TissueTypeList}
                        placeholder="Doku Tipini Seç...??"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Karantina Lokasyonu: {this.state.location.name}
                    </label>
                    <div>
                      <Typeahead
                        id="select-location"
                        onChange={this.changeLocationHandler}
                        labelKey="name"
                        options={this.state.product_LocationList}
                        placeholder="Karantina Lokasyonunu Seç..."
                        disabled
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
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Durumu: {this.state.statusName}</label>
                    <Typeahead
                      id="select-status"
                      onChange={this.changeStatusNameHandler}
                      labelKey="name"
                      options={this.state.product_StatusNameList}
                      placeholder="Durumu Seç..."
                      disabled
                    />
                  </div>

                  <div>
                    <label>Onam Formu:</label>
                    <br />

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
                          <input
                            type="file"
                            onChange={this.selectApproveFile}
                            className={
                              this.hasError("approveFile")
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <div
                            className={
                              this.hasError("approveFile")
                                ? "inline-errormsg"
                                : "hidden"
                            }
                          >
                            Onam Formunu yüklemelisiniz.
                          </div>
                        </label>
                      </div>

                      <button
                        className="btn btn-success"
                        disabled={!selectedApproveFiles}
                        onClick={this.uploadApproveFile}
                      >
                        Onam Formu Yükle
                      </button>

                      <div className="alert alert-light" role="alert">
                        {messageApprove}
                      </div>

                      <div className="card">
                        <div className="card-header">
                          Yüklenen Onam Formları
                        </div>
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
                    <br />
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
                          <input
                            type="file"
                            onChange={this.selectTransferFile}
                            className={
                              this.hasError("approveFile")
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
                </form>

                <Modal
                  isOpen={this.state.showApproveFileModal}
                  toggle={this.handleApproveFileShowModal}
                >
                  <ModalHeader toggle={this.handleApproveFileShowModal}>
                    Kurum Ekle
                  </ModalHeader>
                  <ModalBody>
                    <CreateDonorInstituteComponent />
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className="btn btn-danger"
                      onClick={this.handleApproveFileHideModal}
                    >
                      Kapat
                    </button>
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

export default ViewRejectArchiveComponent;
