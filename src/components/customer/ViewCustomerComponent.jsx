import React, { Component } from 'react';

import CustomerService from '../../services/CustomerService';

class ViewCustomerComponent extends Component {
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
        this.back = this.back.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            CustomerService.getCustomerById(this.state.id).then(res => {
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

    back = (event) => {
        this.props.history.push('/customers');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Müşteri Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Müşteri No:</label>
                                <input placeholder="####" name="identityNumber" className="form-control"
                                value={this.state.identityNumber} disabled />
                            </div>
                            <div className="form-group">
                                <label>Müşteri Tipi: {this.state.customerType}</label>
                                <select className="form-control"  value={this.state.customerType} >
                                {this.state.customerTypeList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} disabled />
                            </div>

                            <div className="form-group">
                                <label>İsim:</label>
                                <input placeholder="Ayşe" name="name" className="form-control"
                                value={this.state.name} disabled />
                            </div>

                            <div className="form-group">
                                <label>Adres:</label>
                                <input placeholder="Adres" name="address" className="form-control"
                                value={this.state.address} disabled />
                            </div>

                            <div className="form-group">
                                <label>Telefon:</label>
                                <input placeholder="(90)5321234567" name="telephone" className="form-control"
                                value={this.state.telephone} disabled />
                            </div>

                            <button className="btn btn-primary" onClick={this.back.bind(this)} style={{marginLeft: "10px"}}>İptal</button>
                        </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default ViewCustomerComponent;