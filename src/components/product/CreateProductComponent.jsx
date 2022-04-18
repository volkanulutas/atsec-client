import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductService from "../../services/ProductService";
import CustomerService from "../../services/CustomerService";
import AddModal from "../util/modal/AddModal";

class CreateProductComponent extends Component {
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

      donor: {},
      customer: [], // Typeahead needs array.
      status: "",
      type: "",
      secCode: "",
      preProcessingType: [],
      definition: "",
      information: "",
      deleted: false,

      errors: [],
      product_CustomerList: [],
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.saveProduct = this.saveProduct.bind(this);
    this.changeCustomerHandler = this.changeCustomerHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changePreProcessingTypeHandler =
      this.changePreProcessingTypeHandler.bind(this);
    this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
    this.changeInformationHandler = this.changeInformationHandler.bind(this);
  }

  componentDidMount() {
    CustomerService.getAllCustomers()
      .then((res) => {
        this.setState({ product_CustomerList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });

    if (this.state.id === "_add") {
      return;
    } else {
      ProductService.getProductById(this.state.id)
        .then((res) => {
          let product = res.data;

          let customerTemp = [product.customer];
          this.setState({
            donor: product.donor,
            customer: customerTemp,
            definition: product.definition,
            status: product.status,
            type: product.type,
            information: product.information,
            secCode: product.secCode,
            preProcessingType: product.preProcessingType,
          });
          console.log("product: " + JSON.stringify(product));
        })
        .catch((ex) => {
          console.error(ex);
        });
    }
  }

  changePreProcessingTypeHandler = (event) => {};

  changeDefinitionHandler = (event) => {
    this.setState({ definition: event.target.value });
  };

  changeStatusHandler = (event) => {
    this.setState({ status: event.target.value });
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  changeInformationHandler = (event) => {
    this.setState({ information: event.target.value });
  };

  changeSecCodeHandler = (event) => {
    this.setState({ secCode: event.target.value });
  };

  changeDonorHandler = (event) => {
    this.setState({ donor: event.target.value });
  };

  changeCustomerHandler = (event) => {
    this.setState({ customer: event.target.value });
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  saveProduct = (event) => {
    event.preventDefault();
    var errors = [];

    if (this.state.customer[0] === undefined) {
      errors.push("customer");
    }

    this.setState({ errors: errors });
    if (errors.length > 0) {
      return false;
    }

    let idParam = undefined;
    let customerParam = this.state.product_CustomerList[0];

    if (this.state.id !== "_add") {
      idParam = this.state.id;
    }

    let product = {
      id: idParam,
      definition: this.state.definition,
      status: this.state.status,
      type: this.state.type,
      information: this.state.information,
      secCode: this.state.secCode,
      donor: this.state.donor,
      customer: this.state.customer[0],
      deleted: this.state.deleted,
    };

    if (this.state.id === "_add") {
      ProductService.createProduct(product)
        .then((res) => {
          const notify = () => toast("Ürün başarılı bir şekilde kaydedildi.");
          notify();
          this.props.history.push("/products");
        })
        .catch((ex) => {
          const notify = () =>
            toast("Ürün kaydedilemedi. Hata Kodu: CRT-PRD-01");
          notify();
        });
    } else {
      ProductService.updateProduct(this.state.id, product)
        .then((res) => {
          const notify = () => toast("Ürün başarılı bir şekilde güncellendi.");
          notify();
          this.props.history.push("/products");
        })
        .catch((ex) => {
          const notify = () =>
            toast("Ürün kaydedilemedi. Hata Kodu: CRT-PRD-02");
          notify();
        });
    }

    // If opened as modal
    if (this.state.callbackModalYes) {
      this.state.callbackModalYes();
    }
  };

  cancel = (event) => {
    // If opened as modal
    if (this.state.callbackModalNo) {
      this.state.callbackModalNo();
    } else {
      this.props.history.push("/products");
    }
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Ürün Ekle</h3>;
    } else {
      return <h3 className="text-center">Ürün Güncelle</h3>;
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
                    <label>Donor Id:</label>
                    <input
                      placeholder="Donor Id:"
                      name="donor.code"
                      className="form-control"
                      value={this.state.donor.code}
                      onChange={this.changeDonorHandler}
                      disabled={!this.state.isEditable}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Müşteri Id:{" "}
                      {this.state.customer[0] === undefined
                        ? "Seçilmedi"
                        : this.state.customer[0].identityNumber +
                          " - " +
                          this.state.customer[0].name}
                    </label>

                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-customer.identityNumber"
                        onChange={(selected) => {
                          this.setState({ customer: selected });
                        }}
                        labelKey="identityNumber"
                        options={this.state.product_CustomerList}
                        placeholder="Müşteri ID Seç..."
                        selected={this.state.customer}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("customer")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        Müşteri ID girmelisiniz.
                      </div>
                      <AddModal
                        style={{ marginRight: "5px" }}
                        initialModalState={false}
                        callback={this.delete}
                        disabled={!this.state.isEditable}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Açıklama:</label>
                    <input
                      placeholder="Açıklama:"
                      name="definition"
                      className="form-control"
                      value={this.state.definition}
                      onChange={this.changeDefinitionHandler}
                      disabled={!this.state.isEditable}
                    />
                  </div>

                  <div className="form-group">
                    <label>Türü:</label>
                    <input
                      placeholder="Türü:"
                      name="type"
                      className="form-control"
                      value={this.state.type}
                      disabled={!this.state.isEditable}
                    />
                  </div>

                  <div className="form-group">
                    <label>Durumu:</label>
                    <input
                      placeholder="Durumu:"
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      disabled={!this.state.isEditable}
                    />
                  </div>

                  <div className="form-group">
                    <label>SEC Kodu:</label>
                    <input
                      placeholder="SEC Kodu:"
                      name="secCode"
                      className="form-control"
                      value={this.state.secCode}
                      disabled={!this.state.isEditable}
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

export default CreateProductComponent;
