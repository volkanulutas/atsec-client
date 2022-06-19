import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductService from "../../services/ProductService";
import CustomerService from "../../services/CustomerService";
import AddModal from "../util/modal/AddModal";
import DonorService from "../../services/DonorService";

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

      donor: [],
      customer: [], // Typeahead needs array.
      preProcessingType: [],
      definition: "",
      information: "",
      deleted: false,

      errors: [],
      product_CustomerList: [],
      product_DonorList: [],
      // modal property
      callbackModalYes: props.callbackModalYes,
      callbackModalNo: props.callbackModalNo,
    };
    this.saveProduct = this.saveProduct.bind(this);
    this.changeCustomerHandler = this.changeCustomerHandler.bind(this);
    this.changePreProcessingTypeHandler =
      this.changePreProcessingTypeHandler.bind(this);
    this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
    this.changeInformationHandler = this.changeInformationHandler.bind(this);
  }

  componentDidMount() {
    DonorService.getAllDonors()
      .then((res) => {
        this.setState({ product_DonorList: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });

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
          let donorTemp = [product.donor];
          this.setState({
            donor: donorTemp,
            customer: customerTemp,
            definition: product.definition,
            status: product.status,
            information: product.information,
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

  changeInformationHandler = (event) => {
    this.setState({ information: event.target.value });
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

    if (this.state.donor[0] === undefined) {
      errors.push("donor");
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
      information: this.state.information,
      customer: this.state.customer[0],
      donor: this.state.donor[0],
      deleted: this.state.deleted,
    };

    if (this.state.id === "_add") {
      console.log(JSON.stringify(product));
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

  addCreateCustomerComponent() {
    window.location.reload();
  }

  addCreateDonorComponent() {
    window.location.reload();
  }

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
                    <label>
                      Donor Id:{" "}
                      {this.state.donor[0] === undefined
                        ? "Seçilmedi"
                        : this.state.donor[0].id +
                          " - " +
                          this.state.donor[0].code}
                    </label>

                    <div>
                      <Typeahead
                        multiple={multiple}
                        id="select-donor"
                        onChange={(selected) => {
                          this.setState({ donor: selected });
                        }}
                        labelKey="code"
                        options={this.state.product_DonorList}
                        placeholder="Donor Seç..."
                        selected={this.state.donor}
                        disabled={!this.state.isEditable}
                      />
                      <div
                        className={
                          this.hasError("donor") ? "inline-errormsg" : "hidden"
                        }
                      >
                        Donor girmelisiniz.
                      </div>
                      <AddModal
                        style={{ marginRight: "5px" }}
                        initialModalState={false}
                        component={"CreateDonorComponent"}
                        callback={this.addCreateDonorComponent}
                        isEditable={this.state.isEditable}
                      />
                    </div>
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
                        component={"CreateCustomerComponent"}
                        callback={this.addCreateCustomerComponent}
                        isEditable={this.state.isEditable}
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
                    Vazgeç
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
