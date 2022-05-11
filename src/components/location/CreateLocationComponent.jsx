import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LocationService from "../../services/LocationService";

class CreateLocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable:
        this.props.match === undefined
          ? true
          : this.props.match.params.state === "view"
          ? false
          : true,
      name: "",
      definition: "",
      deleted: false,
      errors: [],
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.saveLocation = this.saveLocation.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      LocationService.getLocationById(this.state.id)
        .then((res) => {
          let location = res.data;
          this.setState({
            name: location.name,
            definition: location.definition,
          });
          console.log("location: " + JSON.stringify(location));
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
  }

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeDefinitionHandler = (event) => {
    this.setState({ definition: event.target.value });
  };

  saveLocation = (event) => {
    event.preventDefault();
    var errors = [];
    if (this.state.name === "") {
      errors.push("name");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }

    let idTmp = undefined;
    if (this.state.id !== "_add") {
      idTmp = this.state.id;
    }
    let location = {
      id: idTmp,
      name: this.state.name,
      definition: this.state.definition,
      deleted: this.state.deleted,
    };
    if (this.state.id === "_add") {
      LocationService.createLocation(location)
        .then((res) => {
          const notify = () => toast("Konum başarıyla kaydedildi.");
          notify();
          this.props.history.push("/locations");
        })
        .catch((ex) => {
          const notify = () =>
            toast("Konum kaydedilemedi. Hata Kodu: CRT-LOC-01");
          notify();
        });
    } else {
      LocationService.updateLocation(this.state.id, location)
        .then((res) => {
          const notify = () => toast("Konum başarıyla güncellendi.");
          notify();
          this.props.history.push("/locations");
        })
        .catch((ex) => {
          const notify = () =>
            toast("Konum güncellenemedi. Hata Kodu: CRT-LOC-02");
          notify();
        });
    }

    // If opened as modal
    if (this.state.callbackModalYes) {
      this.state.callbackModalYes();
    }
  };

  cancel = (event) => {
    event.preventDefault();

    // If opened as modal
    if (this.state.callbackModalNo) {
      this.state.callbackModalNo();
    } else {
      this.props.history.push("/locations");
    }
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Lokasyon Ekle</h3>;
    } else {
      return <h3 className="text-center">Lokasyon Güncelle</h3>;
    }
  }

  getButtonText() {
    if (this.state.id === "_add") {
      return "Kaydet";
    } else {
      return "Güncelle";
    }
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    return (
      <div>
        <div className="container">
          <ToastContainer />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Lokasyon İsmi:</label>
                    <input
                      placeholder="Lokasyon İsmi"
                      name="name"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                    <div
                      className={
                        this.hasError("name") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Lokasyon ismini girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Açıklama:</label>
                    <input
                      placeholder="Açıklama"
                      name="definition"
                      className="form-control"
                      value={this.state.definition}
                      onChange={this.changeDefinitionHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveLocation.bind(this)}
                  >
                    {this.getButtonText()}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Vazgeç
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

export default CreateLocationComponent;
