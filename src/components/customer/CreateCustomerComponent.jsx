import React, { Component } from 'react';

import CustomerService from '../../services/CustomerService';

class CreateCustomerComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            identityNumber: '',
            customerType: '',
            definition: '',
            name: '',
            address: '', 
            telephone: '',
            deleted: false,
            errors: [],

            customerTypeList: ["Hastane", "Firma", "Bireysel", "Yurt Dışı Acenta"],
        }
        this.saveCustomer = this.saveCustomer.bind(this);
        this.changeIdentityNumberHandler = this.changeIdentityNumberHandler.bind(this);
        this.changeCustomerTypeHandler = this.changeCustomerTypeHandler.bind(this);
        this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
        this.changeTelephoneHandler = this.changeTelephoneHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            CustomerService.getCustomerById(this.state.id)
            .then(res => {
                let customer = res.data;
                this.setState({
                    identityNumber: customer.identityNumber,
                    customerType: customer.customerType,
                    definition: customer.definition,
                    name: customer.name,
                    address: customer.address,
                    telephone: customer.telephone,
                });
                console.log('customer: ' + JSON.stringify(customer));
            }).catch(ex => {
                console.error(ex);
            });
        }  
    }

    changeCustomerTypeHandler = (event) => {
        this.setState({customerType:event.target.value});
    }

    changeIdentityNumberHandler = (event) => {
        this.setState({identityNumber:event.target.value});
    }

    changeDefinitionHandler = (event) => {
        this.setState({definition:event.target.value});
    }

    changeTelephoneHandler = (event) => {
        this.setState({telephone:event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address:event.target.value});
    }

    changeNameHandler = (event) => {
        this.setState({name:event.target.value});
    }

    saveCustomer = (event) => {
        event.preventDefault();
        var errors = [];
        if(this.state.identityNumber === ""){
            errors.push("identityNumber");
        }
        if(this.state.definition === ""){
            errors.push("definition");
        }
        if(this.state.name === ""){
            errors.push("name");
        }
        if(this.state.surname === ""){
            errors.push("surname");
        }
        if(this.state.address === ""){
            errors.push("address");
        }
        if(this.state.telephone === ""){
            errors.push("telephone");
        }
        /* TODO: Telephone formati */

       this.setState({errors: errors});
       if(errors.length > 0){
           return false;
       }
        

        let idParam = undefined;
        let customerTypeParam = this.state.customerTypeList[0];
        if(this.state.customerType !== ""){
            customerTypeParam = this.state.customerType;
        }
        if(this.state.id !== "_add"){
            idParam = this.state.id;
        }
        let customer = {id: idParam, identityNumber: this.state.identityNumber, customerType:  customerTypeParam,
        definition: this.state.definition, name: this.state.name, address: this.state.address, telephone: this.state.telephone, deleted: this.state.deleted };
        console.log('customer: ' + JSON.stringify(customer));
        if(this.state.id === "_add"){
            CustomerService.createCustomer(customer).then(res => {
                    console.log(res); 
                    this.props.history.push('/customers'); 
                }).catch(ex=>{
                    console.error(ex);
            });
        }else{     // TODO: alert basarili
            CustomerService.updateCustomer(this.state.id, customer).then(res => {
                    console.log(res); 
                    this.props.history.push('/customers');
                }).catch(ex => {
                    console.error(ex);
            });
        }   
    }

    cancel = (event) => {
        this.props.history.push('/customers');
    }

    getTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Müşteri Ekle</h3>;
        } else{
            return <h3 className="text-center">Müşteri Güncelle</h3>
        }
    }

    getButtonText(){
        if(this.state.id === "_add"){
            return "Kaydet";
        } else{
            return "Güncelle";
        }
    }

    hasError(key){
        return this.state.errors.indexOf(key) !== -1;
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        {this.getTitle()}
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Müşteri ID:</label>
                                <input placeholder="Müşteri ID" name="identityNumber" className="form-control"
                                value={this.state.identityNumber} onChange={this.changeIdentityNumberHandler} />
                                <div className={this.hasError("identityNumber") ? "inline-errormsg" : "hidden"}>
                                    Müşteri ID girmelisiniz.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Müşteri Tipi: {this.state.customerType}</label>
                                <select className="form-control" value={this.state.customerType} onChange={this.changeCustomerTypeHandler}>
                                {this.state.customerTypeList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} />
                                <div className={this.hasError("identityNumber") ? "inline-errormsg" : "hidden"}>
                                    Açıklamayı girmelisiniz.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>İsim:</label>
                                <input placeholder="Ela" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                                <div className={this.hasError("identityNumber") ? "inline-errormsg" : "hidden"}>
                                    İsmi girmelisiniz.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Adres:</label>
                                <input placeholder="Adres" name="address" className="form-control"
                                value={this.state.address} onChange={this.changeAddressHandler} />
                                <div className={this.hasError("identityNumber") ? "inline-errormsg" : "hidden"}>
                                    Adresi girmelisiniz.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Telefon:</label>
                                <input placeholder="(90)5321234567" name="telephone" className="form-control"
                                value={this.state.telephone} onChange={this.changeTelephoneHandler} />
                                <div className={this.hasError("telephone") ? "inline-errormsg" : "hidden"}>
                                    Telefon numarası uygun formatta değil veya girilmemiş.
                                </div>
                            </div>

                            <button className="btn btn-success" onClick={this.saveCustomer.bind(this)}>{this.getButtonText()}</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>İptal</button>
                        </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default CreateCustomerComponent;