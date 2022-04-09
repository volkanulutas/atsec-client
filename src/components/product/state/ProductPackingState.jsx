import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PackingProductService from "../../../services/PackingProductService";

class ProductPackingState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      number: "",
      date: "",
      lot: "",
      processDate: "",
      packingSize: [],
      product_PackingSizeList: [],
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeNumberHandler = this.changeNumberHandler.bind(this);
  }

  componentDidMount() {
    PackingProductService.getPackingProductSizeList()
      .then((res) => {
        this.setState({ product_PackingSizeList: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: PRD_PACK-01");
        notify();
      });
  }

  changeDateHandler(event) {
    var date = event.target.value;
    var splittedDate = date.split("-");
    var lotTmp = splittedDate[1] + splittedDate[0] + "";
    this.setState({ date: event.target.value });
    this.setState({ lot: lotTmp });
  }

  changeNumberHandler(event) {
    this.setState({ number: event.target.value });
  }

  handleProcessDateChange(event) {
    this.setState({ processDate: event.target.value });
  }

  convertDate(stringDate) {
    return new Date(stringDate).getTime();
  }

  accept(event) {
    event.preventDefault();

    var errors = [];

    if (this.state.packingSize[0] === undefined) {
      errors.push("packingSize");
    }
    if (this.state.processDate === "") {
      errors.push("processDate");
    }
    this.setState({ errors: errors });

    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      var donorTmp = this.state.data.donor;
      let packingProduct = {
        size: this.state.packingSize[0],
        lot: this.state.lot,
        date: this.convertDate(this.state.date),
        donor: donorTmp,
        number: this.state.number,
      };
      this.state.callback_accept(this.state.data, packingProduct);
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
              Paketlemeye Geçiş
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
                    <label>
                      Paketleme Boyutu:{" "}
                      {this.state.packingSize[0] === undefined
                        ? "Seçilmedi"
                        : this.state.packingSize[0].name}
                    </label>
                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-packingSize-quarantina"
                        onChange={(selected) => {
                          this.setState({ packingSize: selected });
                        }}
                        labelKey="name"
                        options={this.state.product_PackingSizeList}
                        placeholder="Paketleme Boyutunu Seç..."
                        selected={this.state.packingSize}
                      />
                    </div>
                    <div
                      className={
                        this.hasError("packingSize")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Paketleme Boyutunu seçmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Gamaya Gönderim Tarihi:</label>
                    <input
                      type="date"
                      placeholder=""
                      name="date"
                      className={
                        this.hasError("date")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.birthdate}
                      onChange={this.changeDateHandler}
                    />
                    <div
                      className={
                        this.hasError("date") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Gama Gönderim Tarihi girilmemiş.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>LOT: </label> {this.state.lot}
                  </div>
                  <div className="form-group">
                    <label>Adet:</label>
                    <input
                      placeholder="Adeti:"
                      name="number"
                      className="form-control"
                      value={this.state.number}
                      onChange={this.changeNumberHandler}
                    />
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
export default ProductPackingState;
