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

      productFormTypeList: [],

      checkedItems: new Map(),
      product_PreprocessingList: [],
    
      errors: [],
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleProductFormChange = this.handleProductFormChange.bind(this);
  }

  componentDidMount() {
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
    if (this.state.checkedItems.size !== 4) {
      errors.push("preprocessing-checkbox");
    }
    if (this.state.productFormTypeList.length === 0) {
      errors.push("productFormType-checkbox");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.row, this.state.productFormTypeList);
    }
  }

  reject(event) {
    event.preventDefault();
    this.state.callback_modalToggle();
  }

  handleProductFormChange(event){
    var isChecked = event.target.checked;
    var item = event.target.value;

    if(isChecked){
      this.setState({
        productFormTypeList:[...this.state.productFormTypeList, item]
      });
    }else{
      var index = this.state.productFormTypeList.indexOf(item);
      if (index > -1) { 
         var arr = this.state.productFormTypeList.splice(index, 1);
         this.setState({arr});
      }
    }
  }

  handleChange(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    const { multiple } = this.state;

    const divStyle = {
      margin: '5px',
    };

    const divStyle2 = {
      marginLeft: '15px',
    };

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
                <Label>İşlem Onayları</Label>
                  </div>
                  
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
                    
                    <div>
                      <Label>Kesme İşlemi:</Label>
                      <div
                      className={
                        this.hasError("productFormType-checkbox")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Lütfen seçim yapınız.
                    </div>
                    </div>

                    
                    <div>
                      <div className="radio">
                        <FormGroup check1>
                        <Label style={divStyle} >
                            <Input
                              type="checkbox"
                               value={"Çips İçin Şerit"}
                              onChange={this.handleChange2}
                            ></Input>
                          Çips İçin Şerit
                          </Label>
                        </FormGroup>
                      </div>
                      <div className="radio">
                        <FormGroup check1>
                        <Label style={divStyle} >
                          Küp
                          </Label>
                          <br>
                          </br>
                          <Label style={divStyle2}>
                            <Input
                              type="checkbox"
                              value={"10x10x20 mm"}
                              onChange={this.handleProductFormChange}
                            ></Input>
                          10x10x20 mm
                          </Label>
                          <Label style={divStyle2}>
                            <Input 
                              type="checkbox"
                              value={"20x20x30 mm"}
                              onChange={this.handleProductFormChange}
                            ></Input>
                          20x20x30 mm
                          </Label>
                          <Label style={divStyle2}>
                            <Input
                              type="checkbox"
                              value={"20x20x10 mm"}
                              onChange={this.handleProductFormChange}
                            ></Input>
                          20x20x10 mm
                          </Label>
                          <Label style={divStyle2}>
                            <Input
                              type="checkbox"
                              value={"10x10x10 mm"}
                              onChange={this.handleProductFormChange}
                            ></Input>
                          10x10x10 mm
                          </Label>
                        
                          
                        </FormGroup>
                      </div>
                      <div className="">

                      </div>
                      <div
                        className={
                          this.hasError("radioButt")
                            ? "inline-errormsg"
                            : "hidden"
                        }
                      >
                        Lütfen seçimi yapınız. [Çips İçin Şerit, Küp]
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
