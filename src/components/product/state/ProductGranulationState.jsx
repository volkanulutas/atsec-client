import React, { Component } from "react";
import { FormGroup, Label, Input, Button, ButtonGroup } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LocationService from "../../../services/LocationService";

// Dondurucu 1 -> Granulation
class ProductGranulationState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      data: props.data,
      callback_accept: props.callback_accept,
      callback_modalToggle: props.callback_modalToggle,

      errors: [],

      processDate: '',

      granulationTypeList: [],

      product_LocationList: [],
    };
    // callback

    this.handleGranulationChange = this.handleGranulationChange.bind(this);
    this.handleProcessDateChange = this.handleProcessDateChange.bind(this);
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
  }

  componentDidMount() {
    LocationService.getAllLocations()
      .then((res) => {
        this.setState({ product_LocationList: res.data });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-FRE-STT-01");
        notify();
      });
  }

  handleProcessDateChange(event){
    this.setState({ processDate: event.target.value });
  }

  handleGranulationChange(event){
    var isChecked = event.target.checked;
    var item = event.target.value;

    if(isChecked){
      this.setState({
        granulationTypeList:[...this.state.granulationTypeList, item]
      });
    }else{
      var index = this.state.granulationTypeList.indexOf(item);
      if (index > -1) { 
         var arr = this.state.granulationTypeList.splice(index, 1);
         this.setState({arr});
      }
    }
  }

  accept(event) {
    event.preventDefault();

    var errors = [];

    if (this.state.granulationTypeList.length === 0) {
      errors.push("granulationType-checkbox");
    }
    if (this.state.processDate === '') {
      errors.push("processDate");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.data, this.state.granulationTypeList, this.state.processDate);
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
                  
            <div className="card col-md-6 offset-md-3 offset-md-3">
              Öğütme Türünü Seçiniz:
              <div className="card-body">
                <form>
                  
                <div className="radio">
                        <FormGroup check1>
                          <Label style={divStyle2}>
                            <Input
                              type="checkbox"
                              value={"f"}
                              onChange={this.handleGranulationChange}
                            ></Input>
                          f
                          </Label>
                          <Label style={divStyle2}>
                            <Input 
                              type="checkbox"
                              value={"xf"}
                              onChange={this.handleGranulationChange}
                            ></Input>
                          xf
                          </Label>
                          <Label style={divStyle2}>
                            <Input
                              type="checkbox"
                              value={"xxf"}
                              onChange={this.handleGranulationChange}
                            ></Input>
                          xxf
                          </Label>
                          <Label style={divStyle2}>
                            <Input
                              type="checkbox"
                              value={"xxxf"}
                              onChange={this.handleGranulationChange}
                            ></Input>
                          xxxf
                          </Label>
                        
                          
                        </FormGroup>
                      </div>
                      <div>
                      <div
                      className={
                        this.hasError("granulationType-checkbox")
                          ? "inline-errormsg"
                          : "hidden"
                      }
                    >
                      Lütfen seçim yapınız.
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
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductGranulationState;
