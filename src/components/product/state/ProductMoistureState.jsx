import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";

import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductMoistureState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      processDate: '',
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
  }

  componentDidMount() {
  }

  handleProcessDateChange(event){
    this.setState({ processDate: event.target.value });
  }

  accept(event) {
    event.preventDefault();
  
    var errors = [];

    if (this.state.processDate === '') {
      errors.push("processDate");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.processDate, this.state.processDate);
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
              Nem Tayini
              <div className="card-body">
                <form>
                <div className="form-group">
                  <label>İşlem Tarihi</label>
                  <input
                    type="datetime-local"
                    id="arrivalDate"
                    name="arrivalDate"
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
                    <Button color="primary" onClick={this.accept}>
                      Kabul
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

export default ProductMoistureState;
