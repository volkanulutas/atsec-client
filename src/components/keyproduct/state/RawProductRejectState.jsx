import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductService from "../../../services/ProductService";
import LocationService from "../../../services/LocationService";

class RawProductRejectState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      processDate: "",
      location: [],
      product_LocationList: [],
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  }

  componentDidMount() {
    LocationService.getLocationsByType("REJECT")
      .then((res) => {
        this.setState({ product_LocationList: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: RAW-REJ-01");
        notify();
      });
  }

  accept(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.location[0].name === undefined) {
      errors.push("location");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(
        this.state.data,
        this.state.location[0],
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

    return (
      <div>
        <div className="container">
          <ToastContainer />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              Ham Ürünler Reddet
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>
                      Yeni Lokasyon:{" "}
                      {this.state.location[0] === undefined
                        ? "Seçilmedi"
                        : this.state.location[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-location-quarantina"
                        onChange={(selected) => {
                          this.setState({ location: selected });
                        }}
                        labelKey="name"
                        options={this.state.product_LocationList}
                        placeholder="Yeni Lokasyonunu Seç..."
                        selected={this.state.location}
                      />
                    </div>
                    <div
                      className={
                        this.hasError("location") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Lokasyonu girmelisiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <Button color="primary" onClick={this.accept}>
                      Tamam
                    </Button>{" "}
                    <Button color="danger" onClick={this.reject}>
                      Vazgeç
                    </Button>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RawProductRejectState;
