import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";

import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProductAfterWashingSterilationState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      phValue: 0,


      dampCheckboxDisabled: true,

      dampCheckboxDisabled2: true,

      product_PreprocessingList: ["Kimyasal Sterilizasyon Çözeltisinin Hazırlanması >> Desikatöre Ekle",
                                  "Desikatörde 200 Milibar 4 Saat Vakum altında Sterilizasyon",
                                  "PBS 4 Yıkama Yap",    
      ],

      checkedItems: new Map(),

      checkedItems2: new Map(),

      checkedItems3: new Map(),

      processDate: '',
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleChange = this.handleChange.bind(this);;  
    this.handleChange3 = this.handleChange3.bind(this);

    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
  }

  changePhValueHandler = (event) => {
    this.setState({phValue:event.target.value});
    // PhValue 
    var phValueFloat;
    try {
      phValueFloat  = parseFloat(this.state.phValue);
    } catch{
      phValueFloat = 0;
    }
    if(phValueFloat >= 6 && phValueFloat <= 7) { // 6 veya 7 arasında ise;
      this.state.dampCheckboxDisabled = false;
      this.state.dampCheckboxDisabled2 = false;
    } else {
      this.state.dampCheckboxDisabled = true;
      this.state.dampCheckboxDisabled2 = true;
    }
  }

  componentDidMount() {
  }

  handleProcessDateChange(event){
    this.setState({ processDate: event.target.value });
  }

  accept(event) {
    event.preventDefault();
  
    var errors = [];

    if (this.state.checkedItems.size !== 3) {
      errors.push("preprocessing-checkbox");
    }
    if (this.state.checkedItems2.size !== 0) {
      errors.push("preprocessing2-checkbox");
    }

    if (this.state.checkedItems3.size !== 1) {
      errors.push("preprocessing2-checkbox");
    }
    // PhValue 
    var phValueFloat;
    try {
      phValueFloat  = parseFloat(this.state.phValue);
    } catch{
      phValueFloat = 0;
    }
    if(phValueFloat >= 6 && phValueFloat <= 7) { // 6 veya 7 arasında ise;
      this.state.phValue = phValueFloat + "";
    } else {
      errors.push("phValue");
    }
    if (this.state.processDate === '') {
      errors.push("processDate");
    }
    // DampValue


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

  handleChange3(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems3: prevState.checkedItems3.set(item, isChecked),
    }));
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
              Kimyasal Sterilizasyon
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
                                <label>Yıkama Solüsyonu PH Ölçüm Değerini Gir: [6-7]</label>
                                <input  type="number" step="0.01" name="phValue"
                                className={this.hasError("phValue") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.phValue} onChange={this.changePhValueHandler} />
                                <div className={this.hasError("phValue") ? "inline-errormsg" : "hidden"}>
                                    PH değeri uygun değerde değil, PBS Yıkama işlemini tekrarlayınız.
                                </div>
                            </div>

                            <div className="form-group">
                      <br></br>
                      <Label>
                        <Input
                          type="checkbox"
                          value={"İzotonik Yıkama"}
                          onChange={this.handleChange3}
                          disabled= {this.state.dampCheckboxDisabled2}
                        ></Input>
                        İzotonik Yıkama
                      </Label>

                    <div
                      className={
                        this.hasError("preprocessing2-checkbox")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Lütfen tüm alanları seçiniz.
                    </div>
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

export default ProductAfterWashingSterilationState;
