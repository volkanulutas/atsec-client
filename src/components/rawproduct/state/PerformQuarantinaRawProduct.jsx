import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button } from "reactstrap";

import RawProductService from "../../../services/RawProductService";
import LocationService from "../../../services/LocationService";

class PerformQuarantinaRawProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      callback_accept: props.callback_accept,
      callback_reject: props.callback_reject,
      data: props.data,
      callback_modalToggle: props.callback_modalToggle,

      selectedTestResultFiles: undefined,
      currentTestResultFile: undefined,
      progressTestResult: 0,
      messageTestResult: "",
      testResultFilesInfos: [],

      selectedExtraFiles: undefined,
      currentExtraFile: undefined,
      progressExtra: 0,
      messageExtra: "",
      extraFilesInfos: [],

      location: [],
      errors: [],

      product_LocationList: [],
    };
    this.selectTestResultFile = this.selectTestResultFile.bind(this);
    this.selectExtraFile = this.selectExtraFile.bind(this);
    this.uploadTestResultFile = this.uploadTestResultFile.bind(this);
    this.uploadExtraFile = this.uploadExtraFile.bind(this);
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  }

  componentDidMount() {
    LocationService.getAllLocations()
      .then((res) => {
        this.setState({ product_LocationList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });

    RawProductService.getFiles().then((response) => {
      this.setState({
        testResultFilesInfos: response.data,
      });
    });
  }

  accept(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.location[0].name === undefined) {
      errors.push("location");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.data, this.state.location);
    }
  }

  reject(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.location[0].name === undefined) {
      errors.push("location");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_reject(this.state.data, this.state.location);
    }
  }

  selectTestResultFile(event) {
    this.setState({
      selectedTestResultFiles: event.target.files,
    });
  }

  selectExtraFile(event) {
    this.setState({
      selectedExtraFiles: event.target.files,
    });
  }

  uploadTestResultFile(event) {
    event.preventDefault();
    let currentTestResultFile = this.state.selectedTestResultFiles[0];

    this.setState({
      progressTestResult: 0,
      currentTestResultFile: currentTestResultFile,
    });

    RawProductService.upload(
      currentTestResultFile,
      "QUARANTINE_TEST_RESULT",
      (event) => {
        this.setState({
          progressTestResult: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        this.setState({
          messageTestResult: response.data.message,
        });
        return RawProductService.getFiles("QUARANTINE_TEST_RESULT");
      })
      .then((files) => {
        this.setState({
          testResultFilesInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progressTestResult: 0,
          messageTestResult: "Could not upload the file!",
          currentTestResultFile: undefined,
        });
      });

    this.setState({
      selectedTestREsultFiles: undefined,
    });
  }

  uploadExtraFile(event) {
    event.preventDefault();
    let currentExtraFile = this.state.selectedExtraFiles[0];

    this.setState({
      progressExtra: 0,
      currentExtraFile: currentExtraFile,
    });

    RawProductService.upload(
      currentExtraFile,
      "QUARANTINE_EXTRA_FILES",
      (event) => {
        this.setState({
          progressExtra: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        this.setState({
          messageExtra: response.data.message,
        });
        return RawProductService.getFiles("QUARANTINE_EXTRA_FILES");
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

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    const {
      multiple,
      selectedTestResultFiles,
      currentTestResultFile,
      progressTestResult,
      messageTestResult,
      testResultFilesInfos,

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
              Devreye Al
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>
                      Yeni Lokasyon:{" "}
                      {this.state.location[0] === undefined
                        ? "Seçilmedi"
                        : this.state.location[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-location-quarantina"
                        onChange={(selected) => {
                          this.setState({ location: selected });
                        }}
                        labelKey="name"
                        options={this.state.product_LocationList}
                        placeholder="Yeni Lokasyonunu Seç..."
                        selected={this.state.location}
                      />
                    </div>

                    <div
                      className={
                        this.hasError("location") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Lokasyonu girmelisiniz.
                    </div>
                  </div>

                  <div>
                    <label>Test Sonucu:</label>
                    <br />

                    <div>
                      {currentTestResultFile && (
                        <div className="progressTestResult">
                          <div
                            className="progressTestResult-bar progressTestResult-bar-info progressTestResult-bar-striped"
                            role="progressTestResultbar"
                            aria-valuenow={progressTestResult}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progressTestResult + "%" }}
                          >
                            {progressTestResult}%
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="btn btn-default">
                          <input
                            type="file"
                            onChange={this.selectTestResultFile}
                            className={
                              this.hasError("testResultFile")
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                          />
                          <div
                            className={
                              this.hasError("testResultFile")
                                ? "inline-errormsg"
                                : "hidden"
                            }
                          >
                            Test Sonucu Formunu yüklemelisiniz.
                          </div>
                        </label>
                      </div>

                      <button
                        className="btn btn-success"
                        disabled={!selectedTestResultFiles}
                        onClick={this.uploadTestResultFile}
                      >
                        Test Sonucu Formunu Yükle
                      </button>

                      <div className="alert alert-light" role="alert">
                        {messageTestResult}
                      </div>

                      <div className="card">
                        <div className="card-header">
                          Yüklenen Onam Formları
                        </div>
                        <ul className="list-group list-group-flush">
                          {testResultFilesInfos &&
                            testResultFilesInfos.map((file, index) => (
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
                        <div className="progressExtraFiles">
                          <div
                            className="progressExtraFiles-bar progressExtraFiles-bar-info progressExtraFiles-bar-striped"
                            role="progressExtraFilesbar"
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

                  <div className="form-group">
                    <Button color="primary" onClick={this.accept}>
                      Kabul
                    </Button>{" "}
                    <Button color="danger" onClick={this.reject}>
                      Red
                    </Button>
                    <Button
                      color="success"
                      onClick={this.state.callback_modalToggle}
                    >
                      İptal
                    </Button>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PerformQuarantinaRawProduct;
