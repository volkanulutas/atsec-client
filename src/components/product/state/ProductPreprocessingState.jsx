import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductService from "../../../services/ProductService";

class ProductPreprocessingState extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      multiple: false,
      data: props.data,
      row: props.row,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      product_PreprocessingList: [],
      checkedItems: new Map(),
      selectedRadio: null, // data to be sent to callback.
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  componentDidMount() {
    // getPreprocessingTypeList


    ProductService.getPreprocessingTypeList()
      .then((res) => {
        this.setState({ product_PreprocessingList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-PRE-STT-01");
        notify();
      });
  }

  accept(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.checkedItems.size !== 3) {
      errors.push("preprocessing-checkbox");
    }

    if (this.state.selectedRadio === null) {
      errors.push("radioButt");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.row, this.state.selectedRadio);
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
              Ön İşlem...
              <div className="card-body">
                <form>
                  <div className="form-group">
                    {this.state.product_PreprocessingList.map((item) => (
                      <Label>
                        <Input
                          type="checkbox"
                          value={item}
                          onChange={this.handleChange}
                        ></Input>
                        {item}
                      </Label>
                    ))}

                    <div
                      className={
                        this.hasError("preprocessing-checkbox")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Lütfen tüm alanları seçiniz.
                    </div>
                  </div>

                  <div className="form-group">
                    <div></div>
                    <div>
                      <div className="radio">
                        <FormGroup check1>
                          <Label check1>
                            <Input
                              type="radio"
                              name="radiobutt"
                              value="radio1"
                              onChange={this.handleRadio}
                            />
                            Çips
                          </Label>
                        </FormGroup>
                      </div>
                      <div className="radio">
                        <FormGroup check1>
                          <Label check1>
                            <Input
                              type="radio"
                              name="radiobutt"
                              value="radio2"
                              onChange={this.handleRadio}
                            />
                            Küp
                          </Label>
                        </FormGroup>
                      </div>
                      <div
                        className={
                          this.hasError("radioButt")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        Lütfen seçimi yapınız. [Çips, Küp]
                      </div>
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

export default ProductPreprocessingState;
