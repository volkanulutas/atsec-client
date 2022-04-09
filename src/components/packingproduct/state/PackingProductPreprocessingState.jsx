import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductService from "../../../services/ProductService";

class PackingProductPreprocessing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      row: props.row,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      date: "",

      errors: [],
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    ProductService.getPreprocessingTypeList()
      .then((res) => {
        this.setState({ product_PreprocessingList: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-PRE-STT-01");
        notify();
      });
  }

  handleDateChange(event) {}

  accept(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.processDate === "") {
      errors.push("date");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(
        this.state.row,
        this.state.productFormTypeList,
        this.state.processDate
      );
    }
  }

  reject(event) {
    event.preventDefault();
    this.state.callback_modalToggle();
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    const { multiple } = this.state;

    const divStyle = {
      margin: "5px",
    };

    const divStyle2 = {
      marginLeft: "15px",
    };

    return (
      <div>
        <div className="container">
          <ToastContainer />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              İşlem Yap
              <div className="card-body">
                <form>
                  <div className="form-group"></div>

                  <div className="form-group">
                    <label>Gamaya Gönderim Tarihi:</label>
                    <input
                      type="datetime-local"
                      id="date"
                      name="date"
                      className={
                        this.hasError("date")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.date}
                      onChange={this.handleDateChange}
                    />
                    <div
                      className={
                        this.hasError("date") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Gamaya Gönderim Tarihini Girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <Button color="primary" onClick={this.accept}>
                      Tamam
                    </Button>{" "}
                    <Button color="danger" onClick={this.reject}>
                      İptal
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PackingProductPreprocessing;
