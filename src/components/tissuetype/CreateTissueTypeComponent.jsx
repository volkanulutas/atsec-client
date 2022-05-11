import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TissueTypeService from "../../services/TissueTypeService";

class CreateTissueTypeComponent extends Component {
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
    this.saveTissueType = this.saveTissueType.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      TissueTypeService.getTissueTypeById(this.state.id)
        .then((res) => {
          let tissueType = res.data;
          this.setState({
            name: tissueType.name,
            definition: tissueType.definition,
          });
          console.log("tissueType: " + JSON.stringify(tissueType));
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

  saveTissueType = (event) => {
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
    let tissueType = {
      id: idTmp,
      name: this.state.name,
      definition: this.state.definition,
      deleted: this.state.deleted,
    };
    if (this.state.id === "_add") {
      TissueTypeService.createTissueType(tissueType)
        .then((res) => {
          this.props.history.push("/tissuetypes");
          const notify = () =>
            toast("Doku Tipi başarılı bir şekilde kaydedildi.");
          notify();
        })
        .catch((ex) => {
          const notify = () =>
            toast("Doku Tipi kaydedilemedi. Hata Kodu: CRT-TIS-01");
          notify();
        });
    } else {
      TissueTypeService.updateTissueType(this.state.id, tissueType)
        .then((res) => {
          this.props.history.push("/tissuetypes");
          const notify = () => toast("Doku Tipi güncellendi.");
          notify();
        })
        .catch((ex) => {
          const notify = () =>
            toast("Doku Tipi güncellenemedi. Hata Kodu: CRT-TIS-01");
          notify();
        });
    }

    // If opened as modal
    if (this.state.callbackModalYes) {
      this.state.callbackModalYes();
    }
  };

  cancel = (event) => {
    // If opened as modal
    if (this.state.callbackModalNo) {
      this.state.callbackModalNo();
    } else {
      this.props.history.push("/tissuetypes");
    }
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Doku Tipi Ekle</h3>;
    } else {
      return <h3 className="text-center">Doku Tipi Güncelle</h3>;
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
                    <label>Doku Tipi:</label>
                    <input
                      placeholder="Doku Tipi"
                      name="name"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("name") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Doku Tipini girmelisiniz.
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
                      disabled={!this.state.isEditable}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveTissueType.bind(this)}
                    disabled={!this.state.isEditable}
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

export default CreateTissueTypeComponent;
