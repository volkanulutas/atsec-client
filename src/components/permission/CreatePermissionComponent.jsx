import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PermissionService from "../../services/PermissionService";

class CreatePermissionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable: this.props.match === undefined ? true : (this.props.match.params.state === "view" ? false : true),
      name: "",
      definition: "",
      deleted: false,
      errors: [],
      showMessage: true,
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.savePermission = this.savePermission.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
    this.changePermissionsHandler = this.changePermissionsHandler.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      PermissionService.getPermissionById(this.state.id)
        .then((res) => {
          let permission = res.data;
          this.setState({
            name: permission.name,
            definition: permission.definition,
          });
          console.log("permission: " + JSON.stringify(permission));
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

  changePermissionsHandler = (event) => {
    this.setState({ permissions: event.target.value });
  };

  savePermission = (event) => {
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
    let permission = {
      id: idTmp,
      name: this.state.name,
      definition: this.state.definition,
      deleted: this.state.deleted,
    };

    if (this.state.id === "_add") {
      PermissionService.createPermission(permission)
        .then((res) => {
          const notify = () => toast("Yetki başarılı bir şekilde kaydedildi.");
          notify();
          this.props.history.push("/permissions");
        })
        .catch((ex) => {
          const notify = () => toast("Yetki güncellenemedi. Hata Kodu: CRT-PRM-01");
          notify();
        });
    } else {
      PermissionService.updatePermission(this.state.id, permission)
        .then((res) => {
          this.props.history.push("/permissions");
          const notify = () => toast("Yetki başarılı bir şekilde güncellendi.");
          notify();
        })
        .catch((ex) => {
          const notify = () => toast("Yetki başarılı bir şekilde güncellendi. Hata Kodu: CRT-PRM-02");
          notify();
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
          this.props.history.push('/permissions');
      } 
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Yetki Ekle</h3>;
    } else {
      return <h3 className="text-center">Yetki Güncelle</h3>;
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
                    <label>İsim:</label>
                    <input
                      placeholder="Yetki İsmi"
                      name="name"
                      className={
                        this.hasError("name")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.name}
                      disabled={!this.state.isEditable}
                      onChange={this.changeNameHandler}
                    />
                    <div
                      className={
                        this.hasError("name") ? "inline-errormsg" : "hidden"
                      }
                    >
                      İsmi girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Açıklama:</label>
                    <input
                      placeholder="Açıklama"
                      name="definition"
                      className="form-control"
                      value={this.state.definition}
                      disabled={!this.state.isEditable}
                      onChange={this.changeDefinitionHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.savePermission.bind(this)}
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

export default CreatePermissionComponent;
