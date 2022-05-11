import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import background from "../../assets/images/login/bio3.svg";

import AuthService from "../../services/AuthService";
import VersionService from "../../services/VersionService";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showForgetPassword: false,
      isLoginSuccessfull: false,
      version: "",
      errors: [],
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.sendForgetPassword = this.sendForgetPassword.bind(this);
    this.login = this.login.bind(this);
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
  }

  componentDidMount() {
    VersionService.getVersion()
      .then((res) => {
        this.setState({ version: res.data });
      })
      .catch((ex) => {
        let res = "Sunucuya Bağlanılamıyor.";
        this.setState({ version: res });
        console.error(ex);
      });
  }

  changeUsernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  handleShowModal() {
    this.setState({ showForgetPassword: true });
  }

  handleHideModal() {
    this.setState({ showForgetPassword: false });
  }

  sendForgetPassword() {
    var errors = [];
    if (this.state.username === "") {
      errors.push("username");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }
    this.setState({ showForgetPassword: false });

    let userRequest = { username: this.state.username };
    AuthService.forgetPassword(userRequest)
      .then((res) => {
        console.log(res.data);
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-LOG-01");
        notify();
      });
  }

  login(event) {
    event.preventDefault();
    var errors = [];
    if (this.state.username === "") {
      errors.push("username");
    }
    if (this.state.password === "") {
      errors.push("password");
    }
    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }
    let loginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    AuthService.login(loginRequest)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.props.history.push("/home");
          window.location.reload();
        }
      })
      .catch((ex) => {
        errors.push("loginError");
        this.setState({ errors: errors });
      });
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <ToastContainer />
          <div className="row ">
            <div className="col-sm-6 bg-dark text-white">
              <div className="row pt-5">
                <div className="col-md-8 col-sm-10 offset-sm-1 offset-md-2">
                  <div className="text-center">
                    <div>
                      <img
                        src="/images/login/bio2.svg"
                        width="50px"
                        height="50px"
                        className="img-fluid"
                        alt=""
                      ></img>

                      <h4>ATSEC</h4>
                    </div>

                    <p>SEC Kodu Üretim ve Süreç Yönetimi</p>
                    <p>v {this.state.version}</p>
                  </div>

                  <div className="login ">
                    <form action="" className="pt-3">
                      <div>
                        <input
                          type="email"
                          name="username"
                          id="username"
                          className={
                            this.hasError("username")
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          value={this.state.username}
                          onChange={this.changeUsernameHandler}
                          placeholder="E-posta"
                        />
                      </div>
                      <div
                        className={
                          this.hasError("username")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        E-posta girmelisiniz.
                      </div>
                      <div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className={
                            this.hasError("passowrd")
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          value={this.state.password}
                          onChange={this.changePasswordHandler}
                          placeholder="Şifre"
                        />
                        <div
                          className={
                            this.hasError("password")
                              ? "inline-errormsg"
                              : "hidden"
                          }
                        >
                          Şifre girmelisiniz.
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-success btn-block"
                          onClick={this.login}
                        >
                          Giriş
                        </button>
                        <div
                          className={
                            this.hasError("loginError")
                              ? "inline-errormsg"
                              : "hidden"
                          }
                        >
                          Şifre veya kullanıcı adı yanlış.
                        </div>
                      </div>
                    </form>

                    <Button color="primary" onClick={this.handleShowModal}>
                      Şifremi Unuttum
                    </Button>
                    <Modal
                      isOpen={this.state.showForgetPassword}
                      toggle={this.handleShowModal}
                    >
                      <ModalHeader toggle={this.handleShowModal}>
                        Şifremi Unuttum
                      </ModalHeader>
                      <ModalBody>
                        <input
                          type="email"
                          name=""
                          id="username"
                          className="form-control"
                          value={this.state.username}
                          onChange={this.changeUsernameHandler}
                          required
                          placeholder="E-posta"
                        />
                        <div
                          className={
                            this.hasError("username")
                              ? "inline-errormsg"
                              : "hidden"
                          }
                        >
                          E-posta girmelisiniz.
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <button
                          className="btn btn-danger"
                          onClick={this.handleHideModal}
                        >
                          Vazgeç
                        </button>{" "}
                        <button
                          className="btn btn-success"
                          onClick={this.sendForgetPassword}
                        >
                          Gönder
                        </button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 bg">
              <div
                style={{
                  backgroundImage: `url(${background})`,
                  height: "100%",
                  margin: 0,
                }}
                className="text-center"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
