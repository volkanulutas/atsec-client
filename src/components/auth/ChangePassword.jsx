import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthService from "../../services/AuthService";

class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      username: "",
      password: "",
      password2: "",
      errors: [],
    };
    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {}

  changePassword = (event) => {
    event.preventDefault();
    var errors = [];
    if (this.state.password === "") {
      errors.push("password");
    }
    if (this.state.password2 === "") {
      errors.push("password2");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }
    let changePassword = {
      token: this.state.id,
      password: this.state.password,
    };

    AuthService.changePassword(changePassword)
      .then((res) => {
        const notify = () => toast("Şifre  başarılı bir şekilde değiştirildi.");
        notify();
      })
      .catch((ex) => {
        const notify = () =>
          toast("Şifre değiştirilemedi. Hata Kodu: LST-CHN-PSW-01");
        notify();
      });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changePassword2Handler = (event) => {
    this.setState({ password2: event.target.value });
  };

  cancel = (event) => {
    this.props.history.push("/home");
  };

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
              <h3 className="text-center">Şifre Değiştir</h3>
              <div className="card-body">
                <form>
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
                      onChange={this.changePasswordHandler}
                    />
                    <div
                      className={
                        this.hasError("password") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Şifrenizi girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Şifrenizi Tekrar Giriniz:</label>
                    <input
                      type="password"
                      placeholder="Şifrenizi Tekrar Giriniz:"
                      name="password2"
                      className={
                        this.hasError("password2")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.password2}
                      onChange={this.changePassword2Handler}
                    />
                    <div
                      className={
                        this.hasError("password2")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Şifrenizi tekrarlayınız.
                    </div>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.changePassword.bind(this)}
                  >
                    Kaydet
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

export default ChangePasswordComponent;
