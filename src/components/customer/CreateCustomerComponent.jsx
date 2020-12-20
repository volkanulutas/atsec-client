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
            CustomerService.createCustomer(customer).then(
                (response) => { console.log(response); 
                    this.props.history.push('/customers'); 
                }).catch(ex=>{
                console.log(ex);
            });
        }else{     // TODO: alert basarili
            CustomerService.updateCustomer(this.state.id, customer).then(
                (response) => { console.log(response); 
                    this.props.history.push('/customers');
                }).catch(ex=>{
                console.log(ex);
            });
        }   
    }

    cancel = (event) => {
        this.props.history.push('/customers');
    }

    getTitle()
    {
        if(this.state.id === "_add")
        {
            return <h3 className="text-center">Müşteri Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Müşteri Güncelle</h3>
        }
    }

    getButtonText()
    {
        if(this.state.id === "_add")
        {
            return "Kaydet";
        }
        else{
            return "Güncelle";
        }
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
                                <label>Müşteri No:</label>
                                <input placeholder="123" name="identityNumber" className="form-control"
                                value={this.state.identityNumber} onChange={this.changeIdentityNumberHandler} />
                            </div>
                            <div className="form-group">
                                <label>Müşteri Tipi: {this.state.customerType}</label>
                                <select className="form-control"  value={this.state.customerType} onChange={this.changeCustomerTypeHandler}>
                                {this.state.customerTypeList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} />
                            </div>

                            <div className="form-group">
                                <label>İsim:</label>
                                <input placeholder="Ela" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>

                            <div className="form-group">
                                <label>Adres:</label>
                                <input placeholder="Adres" name="address" className="form-control"
                                value={this.state.address} onChange={this.changeAddressHandler} />
                            </div>

                            <div className="form-group">
                                <label>Telefon:</label>
                                <input placeholder="(90)5321234567" name="telephone" className="form-control"
                                value={this.state.telephone} onChange={this.changeTelephoneHandler} />
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