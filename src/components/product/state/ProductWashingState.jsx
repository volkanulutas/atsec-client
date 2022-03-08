import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductService from "../../../services/ProductService";
import LocationService from "../../../services/LocationService";


class ProductWashingState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      processDate: '',
      
      location: [],
      product_LocationList: [],

      product_WashingList: [],
      checkedItems: new Map(),
      selectedRadio: null, // data to be sent to callback.
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);

    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
  }

  componentDidMount() {
    LocationService.getAllLocations()
    .then((res) => {
      this.setState({ product_LocationList: res.data });
    })
    .catch((ex) => {
      const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-PRD-WSH-02");
      notify();
    });

    ProductService.getWashingTypeList()
      .then((res) => {
        this.setState({ product_WashingList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-PRD-WSH-01");
        notify();
      });
  }

  handleProcessDateChange(event){
    this.setState({ processDate: event.target.value });
  }

  accept(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.checkedItems.size !== 10) {
      errors.push("washing-checkbox");
    }
    if (this.state.processDate === '') {
      errors.push("processDate");
    }

    this.setState({ errors: errors });

    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.data, this.state.selectedRadio, this.state.processDate);
    }
  }

  reject(event) {
    event.preventDefault();
    this.state.callback_modalToggle();
  }

  handleChange(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  handleRadio(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;
    if (isChecked) {
      this.setState({ selectedRadio: item });
    }
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
          Defatting...
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
                  {this.state.product_WashingList.map((item) => (
                    <div>

                    <br></br>
                    <Label>
                      <Input
                        type="checkbox"
                        value={item}
                        onChange={this.handleChange}
                      ></Input>
                      {item}
                    </Label>
                    <br></br>
                    </div>
                  ))}

                  <div
                    className={
                      this.hasError("washing-checkbox")
                        ? "inline-errormsg"
                        : "hidden"
                    }
                  >
                    Lütfen tüm alanları seçiniz.
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

export default ProductWashingState;
