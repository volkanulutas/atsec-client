import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductService from "../../services/ProductService";
import PackingProductService from "../../services/PackingProductService";
import DonorService from "../../services/DonorService";
import AddModal from "../util/modal/AddModal";
 
class CreatePackingProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match === undefined ? "_add" : this.props.match.params.id,
      isEditable: this.props.match === undefined ? true : (this.props.match.params.state === "view" ? false : true),
      multiple: false,

      id: "",
      size: "",
      lot: "",
      gamaDate: "",
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
    this.changeGamaDateHandler = this.changeGamaDateHandler.bind(this);
    this.changePackingProductCodeHandler = this.changePackingProductCodeHandler.bind(this);
    this.changePartitionIdHandler = this.changePartitionIdHandler.bind(this);
  }

  componentDidMount() {

    DonorService.getAllDonors()
    .then((res) => {
      this.setState({ product_DonorList: res.data });
      console.log('customer: ' + JSON.stringify(this.state.product_DonorList));
    })
    .catch((ex) => {
      console.error(ex);
    });

    if (this.state.id === "_add") {
      return;
    } else {
      PackingProductService.getPackingProductById(this.state.id)
        .then((res) => {
          let product = res.data;
          this.setState({
            donor: product.donor,
            size: product.size,
            lot: product.lot,
            gamaDate: product.gamaDate,
            packingProductCode: product.packingProductCode,
            partitionId: product.partitionId,
          });
          console.log("packingProduct: " + JSON.stringify(product));
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

  changeGamaDateHandler = (event) =>{
    this.setState({ gamaDate: event.target.value });
  }

  changePackingProductCodeHandler = (event) =>{
    this.setState({ packingProductCode: event.target.value });
  }

  changePartitionIdHandler = (event) =>{
    this.setState({ partitionId: event.target.value });
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  saveProduct = (event) => {
    event.preventDefault();
  };

  cancel = (event) => {
    // If opened as modal
    if(this.state.callbackModalNo){
        this.state.callbackModalNo();
    } else {
        this.props.history.push('/packingproducts');
    } 
  };

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Paketlenmiş Ürün Ekle</h3>;
    } else {
      return <h3 className="text-center">Paketlenmiş Ürün Güncelle</h3>;
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
                      name="gamaDate"
                      className="form-control"
                      value={this.state.gamaDate}
                      onChange={this.changeGamaDateHandler}
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
            <label>
              Donör Kodu:{" "}
              {this.state.donor[0] === undefined
                ? "Seçilmedi"
                : this.state.donor[0].code}
            </label>
   
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
                disabled
                /*disabled={!this.state.isEditable || !(this.state.id === "_add" || this.state.id === null)}*/
              />
        <div
          className={
            this.hasError("donor")
              ? "inline-errormsg"
              : "hidden"
          }
        >
          Donör kodu seçmelisiniz.
        </div>
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
