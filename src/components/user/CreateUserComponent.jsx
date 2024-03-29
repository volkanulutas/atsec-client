import React, { Component } from "react";
import ReactFormInputValidation from "react-form-input-validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserService from "../../services/UserService";
import RoleService from "../../services/RoleService";

class CreateUserComponent extends Component {
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
      surname: "",
      username: "",
      password: "",
      password2: "",
      role: "",
      enabled: true,
      deleted: false,
      allRoles: [],
      success: false,
      errors: [],
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changeEnabledHandler = this.changeEnabledHandler.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.changePassword1Handler = this.changePassword1Handler.bind(this);
    this.changePassword2Handler = this.changePassword2Handler.bind(this);
  }

  componentDidMount() {
    RoleService.getAllRoles()
      .then((res) => {
        console.log(res);
        let roles = res.data;
        this.setState({ allRoles: roles });
      })
      .catch((ex) => {
        console.error(ex);
      });
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id)
        .then((res) => {
          let user = res.data;
          this.setState({
            id: user.id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            enabled: user.enabled,
            role: user.role,
          });
        })
        .catch((ex) => {
          const notify = () =>
            toast("Kullanıcı bulunamadı. Hata Kodu: CRT-USR-01");
          notify();
        });
    }
  }

  saveUser = (event) => {
    event.preventDefault();
    var errors = [];
    if (this.state.name === "") {
      errors.push("name");
    }
    if (this.state.surname === "") {
      errors.push("surname");
    }
    if (this.state.user === "") {
      errors.push("username");
    }
    if (this.state.password === "") {
      errors.push("password2");
    }
    if (this.state.password2 === "") {
      errors.push("password2");
    }
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(this.state.username).toLowerCase());
    if (!validEmail) {
      errors.push("username");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }

    let idTmp = undefined;
    let roleTmp = this.state.allRoles[0].id;
    if (this.state.role !== "") {
      roleTmp = this.state.role;
    }
    if (this.state.id !== "_add") {
      idTmp = this.state.id;
    }
    let user = {
      id: idTmp,
      name: this.state.name,
      surname: this.state.surname,
      username: this.state.username,
      password: this.state.password,
      enabled: this.state.enabled,
      role: roleTmp,
    };
    console.log("user: " + JSON.stringify(user));
    if (this.state.id === "_add") {
      UserService.createUser(user)
        .then((res) => {
          const notify = () => toast("Kullanıcı kaydedildi.");
          notify();
          this.props.history.push("/users");
        })
        .catch((ex) => {
          const notify = () =>
            toast("Kullanıcı kaydedilemedi. Hata Kodu: CRT-USR-02");
          notify();
        });
    } else {
      UserService.updateUser(this.state.id, user)
        .then((res) => {
          const notify = () => toast("Kullanıcı güncellendi.");
          notify();
          this.props.history.push("/users");
        })
        .catch((ex) => {
          const notify = () =>
            toast("Kullanıcı güncellenemedi. Hata Kodu: CRT-USR-03");
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
      this.props.history.push("/users");
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeSurnameHandler = (event) => {
    this.setState({ surname: event.target.value });
  };

  changeUsernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changeEnabledHandler = (event) => {
    this.setState({ enabled: event.target.checked });
  };

  changePassword1Handler = (event) => {
    this.setState({ password: event.target.value });
    // TODO: passwordlerin ayni olmasını anlik kontrol et
  };

  changePassword2Handler = (event) => {
    this.setState({ password2: event.target.value });
    // TODO: passwordlerin ayni olmasını anlik kontrol et
  };

  changeRoleHandler = (event) => {
    this.setState({ role: event.target.value });
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  getUsername() {
    if (this.state.id === "_add") {
      return (
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input
            placeholder="ayilmaz@atg.eu.com"
            name="username"
            className={
              this.hasError("username")
                ? "form-control is-invalid"
                : "form-control"
            }
            value={this.state.username}
            onChange={this.changeUsernameHandler}
          />
          <div className={this.hasError("name") ? "inline-errormsg" : "hidden"}>
            E-posta adresi geçersiz veya girilmemiştir.
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input
            placeholder="ayilmaz@atg.eu.com"
            name="username"
            className={
              this.hasError("username")
                ? "form-control is-invalid"
                : "form-control"
            }
            value={this.state.username}
            onChange={this.changeUsernameHandler}
            disabled
          />
        </div>
      );
    }
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Kullanıcı Ekle</h3>;
    } else {
      return <h3 className="text-center">Kullanıcı Güncelle</h3>;
    }
  }

  getButtonText() {
    if (this.state.id === "_add") {
      return "Kaydet";
    } else {
      return "Güncelle";
    }
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
                    <label>Adı:</label>
                    <input
                      placeholder="Ahmet"
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
                      Adı girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Soyadı:</label>
                    <input
                      placeholder="Yılmaz"
                      name="surname"
                      className={
                        this.hasError("surname")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.surname}
                      onChange={this.changeSurnameHandler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("surname") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Adı girmelisiniz.
                    </div>
                  </div>
                  {this.getUsername()}
                  <div className="form-group">
                    <label>Şifre:</label>
                    <input
                      type="password"
                      placeholder="Şifre"
                      name="password"
                      className={
                        this.hasError("password")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.password}
                      onChange={this.changePassword1Handler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("password") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Şifreyi girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Şifreyi Tekrarla:</label>
                    <input
                      type="password"
                      placeholder="Şifre"
                      name="password2"
                      className={
                        this.hasError("password2")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.password2}
                      onChange={this.changePassword2Handler}
                      disabled={!this.state.isEditable}
                    />
                    <div
                      className={
                        this.hasError("password2")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Şifreyi girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Rol:</label>
                    <select
                      className="form-control"
                      value={this.state.role}
                      onChange={this.changeRoleHandler}
                      disabled={!this.state.isEditable}
                    >
                      {this.state.allRoles.map((option) => (
                        <option value={option.id}>
                          {" "}
                          {option.id} - {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Aktiflik:</label>
                    <input
                      type="checkbox"
                      name="enabled"
                      checked={this.state.enabled}
                      onChange={this.changeEnabledHandler}
                      style={{ marginLeft: "10px" }}
                      disabled={!this.state.isEditable}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveUser.bind(this)}
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

export default CreateUserComponent;
