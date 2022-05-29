import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductDryingState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      checkedItems: new Map(),

      processDate: "",
      beginningDate: "",
      endDate: "",
      dampValue: 0,
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
    this.handleBeginningDateChange = this.handleBeginningDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSteriliteChange = this.handleSteriliteChange.bind(this);
    this.changeDampValueHandler = this.changeDampValueHandler.bind(this);
  }

  componentDidMount() {
    this.state.checkedItems.set("Strelite Testi", false);
  }

  changeDampValueHandler = (event) => {
    var value = event.target.value;
    this.setState({ dampValue: value });
  };

  handleBeginningDateChange(event) {
    this.setState({ beginningDate: event.target.value });
  }

  handleEndDateChange(event) {
    this.setState({ endDate: event.target.value });
  }

  handleSteriliteChange(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  handleProcessDateChange(event) {
    this.setState({ processDate: event.target.value });
  }

  accept(event) {
    event.preventDefault();

    var errors = [];

    if (this.state.processDate === "") {
      errors.push("processDate");
    }
    if (this.state.beginningDate === "") {
      errors.push("beginningDate");
    }
    var dampValueInt;
    try {
      dampValueInt = parseInt(this.state.dampValue);
    } catch {
      dampValueInt = 0;
    }

    if (dampValueInt >= 6) {
      errors.push("dampValue");
    } else {
      this.state.dampValue = dampValueInt + "";
    }

    if (this.state.endDate === "") {
      errors.push("endDate");
    }

    alert(this.state.checkedItems.get("Strelite Testi"));
    if (this.state.checkedItems.get("Strelite Testi") == false) {
      errors.push("strelite");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.data, this.state.processDate);
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

    return (
      <div>
        <div className="container">
          <ToastContainer />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              Kurutma
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>İşlem Tarihi</label>
                    <input
                      type="datetime-local"
                      id="processDate"
                      name="processDate"
                      className={
                        this.hasError("processDate")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.processDate}
                      onChange={this.handleProcessDateChange}
                    />
                    <div
                      className={
                        this.hasError("processDate")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      İşlem Tarihini girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Kurutma Başlangıç Tarihi</label>
                    <input
                      type="datetime-local"
                      id="beginningDate"
                      name="beginningDate"
                      className={
                        this.hasError("beginningDate")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.beginningDate}
                      onChange={this.handleBeginningDateChange}
                    />
                    <div
                      className={
                        this.hasError("beginningDate")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Kurutma Başlangıç Tarihini girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Kurutma Bitirme Tarihi</label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      name="endDate"
                      className={
                        this.hasError("endDate")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.endDate}
                      onChange={this.handleEndDateChange}
                    />
                    <div
                      className={
                        this.hasError("endDate") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Kurutma Bitirme Tarihini girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Nem Tayini % Değerini Gir: [6'dan küçük değer]
                    </label>
                    <input
                      type="number"
                      name="dampValue"
                      className={
                        this.hasError("dampValue")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.dampValue}
                      onChange={this.changeDampValueHandler}
                    />
                    <div
                      className={
                        this.hasError("dampValue")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Nem değeri uygun aralıkta değil, Kurutma işlemini
                      tekrarlayınız.
                    </div>
                  </div>

                  <div className="form-group">
                    <Label>
                      <Input
                        type="checkbox"
                        value="Strelite Testi"
                        onChange={this.handleSteriliteChange}
                      ></Input>
                      Strelite Testi
                    </Label>

                    <div
                      className={
                        this.hasError("strelite") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Strelite Testi onayını vermelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <Button color="primary" onClick={this.accept}>
                      Kabul
                    </Button>{" "}
                    <Button color="danger" onClick={this.reject}>
                      Vazgeç
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

export default ProductDryingState;
