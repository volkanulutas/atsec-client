import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PackingProductService from "../../services/PackingProductService";
import DonorService from "../../services/DonorService";

class CreatePackingProductComponent extends Component {
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
      multiple: false,

      id: "",
      size: "",
      lot: "",
      date: "",
      packingProductCode: "",
      donor: [],
      partitionId: "",

      product_DonorList: [],

      errors: [],

      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.saveProduct = this.saveProduct.bind(this);

    this.changeSizeHandler = this.changeSizeHandler.bind(this);
    this.changeLotHandler = this.changeLotHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changePackingProductCodeHandler =
      this.changePackingProductCodeHandler.bind(this);
    this.changePartitionIdHandler = this.changePartitionIdHandler.bind(this);
  }

  convertString(dateLong) {
    if (dateLong !== undefined) {
      let date = new Date(dateLong);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 + "";
      let day = date.getDate() + "";
      let hour = date.getHours();
      let min = date.getMinutes();
      if (month.length === 1) {
        month = "0" + month;
      }
      if (day.length === 1) {
        day = "0" + day;
      }
      let d = year + "-" + month + "-" + day + "T" + hour + ":" + min;
      return d;
    }
  }

  componentDidMount() {
    DonorService.getAllDonors()
      .then((res) => {
        this.setState({ product_DonorList: res.data });
        console.log(
          "customer: " + JSON.stringify(this.state.product_DonorList)
        );
      })
      .catch((ex) => {
        console.error(ex);
      });
    if (this.state.id === "_add") {
      return;
    } else {
      // TODO: this.state.id is not updated.
      PackingProductService.getPackingProductById(this.props.match.params.id)
        .then((res) => {
          let product = res.data;
          this.setState({
            donor: product.donor,
            size: product.size,
            lot: product.lot,
            date: product.date,
            packingProductCode: product.packingProductCode,
            partitionId: product.partitionId,
          });
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
  }

  changeSizeHandler = (event) => {
    this.setState({ size: event.target.value });
  };

  changeLotHandler = (event) => {
    this.setState({ lot: event.target.value });
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changePackingProductCodeHandler = (event) => {
    this.setState({ packingProductCode: event.target.value });
  };

  changePartitionIdHandler = (event) => {
    this.setState({ partitionId: event.target.value });
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  saveProduct = (event) => {
    event.preventDefault();
  };

  cancel = (event) => {
    // If opened as modal
    if (this.state.callbackModalNo) {
      this.state.callbackModalNo();
    } else {
      this.props.history.push("/packingproducts");
    }
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Paketlenmiş Ürün Ekle</h3>;
    } else {
      return <h3 className="text-center">Paketlenmiş Ürün Görüntüle</h3>;
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
    const { multiple } = this.state;
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
                    <label>Boyut:</label>
                    <input
                      placeholder="Boyut:"
                      name="size"
                      className="form-control"
                      value={this.state.size}
                      onChange={this.changeSizeHandler}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Lot:</label>
                    <input
                      placeholder="Lot:"
                      name="lot"
                      value={this.state.lot}
                      onChange={this.changeLotHandler}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Gama Tarihi:</label>
                    <input
                      placeholder="Gama Tarihi:"
                      name="date"
                      className="form-control"
                      value={this.state.date}
                      onChange={this.changeDateHandler}
                      disabled={!this.state.isEditable}
                    />
                  </div>
                  <div className="form-group">
                    <label>Paketlenmiş Ürün Kodu:</label>
                    <input
                      placeholder="Paketlenmiş Ürün Kodu:"
                      name="packingProductCode"
                      className="form-control"
                      value={this.state.packingProductCode}
                      onChange={this.changePackingProductCodeHandler}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Bölütleme Kodu:</label>
                    <input
                      placeholder="Bölütleme Kodu:"
                      name="secCode"
                      className="form-control"
                      value={this.state.partitionId}
                      onChange={this.changePartitionIdHandler}
                      disabled
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveProduct.bind(this)}
                    disabled={!this.state.isEditable}
                  >
                    {this.getButtonText()}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    İptal
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

export default CreatePackingProductComponent;
