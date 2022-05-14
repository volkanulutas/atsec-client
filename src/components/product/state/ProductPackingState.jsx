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
      packingNumber: "",
      product_PackingSizeList: [],
      packingSize: new Map([]),
      packingItemNumber: new Map(),
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeNumberHandler = this.changeNumberHandler.bind(this);
    this.changePackingNumberHandler =
      this.changePackingNumberHandler.bind(this);
    this.changePackingItemNumberHandler =
      this.changePackingItemNumberHandler.bind(this);
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

  changePackingItemNumberHandler(event, count) {
    var value = event.target.value;
    this.setState((prevState) => ({
      packingItemNumber: prevState.packingItemNumber.set(count + "", value),
    }));
  }

  getPacking(multiple) {
    return (
      <div>
        {Array(this.state.packingNumber)
          .fill(0)
          .map((_, i) => (
            <div className="form-group">
              <div>
                <Typeahead
                  multiple={multiple}
                  id="select-packingSize"
                  onChange={(selected) => {
                    this.setState((prevState) => ({
                      packingSize: prevState.packingSize.set(i + "", selected),
                    }));
                  }}
                  labelKey="name"
                  options={this.state.product_PackingSizeList}
                  placeholder="Paketleme Boyutunu Seç..."
                  selected={this.state.packingSize.get(i + "")}
                />
              </div>

              <div
                className={
                  this.hasError("packingSize" + i)
                    ? "inline-errormsg"
                    : "hidden"
                }
              >
                Paketleme Boyutunu seçmelisiniz.
              </div>
              <div>
                <label>Paket Sayısı:</label>
                <input
                  type="number"
                  placeholder="1"
                  name="packingNumber"
                  className={
                    this.hasError("date")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.packingItemNumber.get(i + "")}
                  onChange={(e) => this.changePackingItemNumberHandler(e, i)}
                />
                <div
                  className={
                    this.hasError("packingNumber" + i)
                      ? "inline-errormsg"
                      : "hidden"
                  }
                >
                  Paket Sayısı Girilmemiş.
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  changeDateHandler(event) {
    var date = event.target.value;
    var splittedDate = date.split("-");
    var lotTmp = splittedDate[1] + splittedDate[0] + "";
    this.setState({ date: event.target.value });
    this.setState({ lot: lotTmp });
  }

  changePackingNumberHandler(event) {
    this.setState({
      packingNumber: Math.max(parseInt(event.target.value, 10), 0),
    });
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

    alert(
      this.state.packingSize.size +
        " " +
        this.state.packingNumber +
        " " +
        this.state.packingItemNumber.size
    );
    if (this.state.packingSize.length !== this.state.packingNumber) {
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

      console.log("");
      // this.state.callback_accept(this.state.data, packingProduct);
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
                    <label>Paket Sayısı:</label>
                    <input
                      type="number"
                      placeholder="1"
                      name="packingNumber"
                      className={
                        this.hasError("date")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.packingNumber}
                      onChange={this.changePackingNumberHandler}
                    />
                    <div
                      className={
                        this.hasError("packingNumber")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Paket Sayısı Girilmemiş.
                    </div>
                  </div>

                  {this.getPacking(multiple)}

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
export default ProductPackingState;
