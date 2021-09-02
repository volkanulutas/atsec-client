import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";

import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

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

      dampValue: 0,
      dampCheckboxDisabled: true,

      product_PreprocessingList: ["%2'lik Peratatik Asit Etanol Steril Mili Q su >> Desikatöre Ekle",
                                  "200 Milibar 4 Saat Vakum Uygula",
                                  "PBS 4 Yıkama Yap",    
      ],


      product_Preprocessing2List: ["Kurutma İşlemi",    
      ],

      checkedItems: new Map(),

      checkedItems2: new Map(),
    };
    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
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
    } else {
      this.state.dampCheckboxDisabled = true;
    }
  }

  changeDampValueHandler = (event) => {
    var value = event.target.value;
    this.setState({dampValue: value});
  }

  componentDidMount() {
  }

  accept(event) {
    event.preventDefault();
  
    var errors = [];
    if (this.state.checkedItems.size !== 3) {
      errors.push("preprocessing-checkbox");
    }

    if (this.state.checkedItems2.size !== 1) {
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
    // DampValue
    var dampValueInt;
    try {
      dampValueInt  = parseInt(this.state.dampValue);
    } catch{
      dampValueInt = 0;
    }
    if(dampValueInt >= 6) {
      errors.push("dampValue");
    }
    else {
      this.state.dampValue = dampValueInt + "";
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.data, this.state.selectedRadio);
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

  handleChange2(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems2: prevState.checkedItems2.set(item, isChecked),
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
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              Kimyasal Sterilazsyon
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
                    {this.state.product_Preprocessing2List.map((item) => (
                      <Label>
                        <Input
                          type="checkbox"
                          value={item}
                          onChange={this.handleChange2}
                          disabled= {this.state.dampCheckboxDisabled}
                        ></Input>
                        {item}
                      </Label>
                    ))}

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
                                <label>Nem Tayini % Değerini Gir: [6'dan küçük değer]</label>
                                <input type="number" name="dampValue"
                             
                                className={this.hasError("dampValue") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.dampValue} onChange={this.changeDampValueHandler} />
                                <div className={this.hasError("dampValue") ? "inline-errormsg" : "hidden"}>
                                    Nem değeri uygun aralıkta değil, Kurutma işlemini tekrarlayınız.
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
