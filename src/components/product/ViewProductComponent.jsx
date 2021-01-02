import React, { Component } from 'react';

import ProductService from '../../services/ProductService';

class ViewProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            definition: '',
            status: '',
            type: '',
            expirationDate: '', 
            splitLength: '',
            information: '',
            secCode: '',
            donor: {},
            customer: {},
            deleted: false,
            productStatusList: [ "Karantina", "Stok", "Numune", "Zaiyat", "Geri Çağrılmış"],
            productTypeList: ["NONE"],
        }
        this.back = this.back.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            ProductService.getProductById(this.state.id)
            .then(res => {
                let product = res.data;
                this.setState({
                    name: product.name,
                    definition: product.definition,
                    status: product.status,
                    type: product.type,
                    expirationDate: product.expirationDate, 
                    splitLength: product.splitLength,
                    information: product.information,
                    secCode: product.secCode,
                });
                console.log('product: ' + JSON.stringify(product));
            }).catch(ex => {
                console.error(ex);
            });
        }  
    }

    back = (event) => {
        this.props.history.push('/products');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Ürün Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Adı:</label>
                                <input placeholder="Adı" name="name" className="form-control"
                                value={this.state.name} disabled />
                            </div>
                   
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} disabled />
                            </div>

                            <div className="form-group">
                                <label>Durumu: {this.state.status}</label>
                                <select className="form-control"  value={this.state.status} >
                                {this.state.productStatusList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tipi: {this.state.type}</label>
                                <select className="form-control"  value={this.state.type} >
                                {this.state.productTypeList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>SKT:</label>
                                <input type="date" id="expirationDate" name="expirationDate" 
                                 value={this.state.expirationDate} disabled />
                            </div>

                            <div className="form-group">
                                <label>Parça No:</label>
                                <input placeholder="1" name="splitLength" className="form-control"
                                value={this.state.splitLength} disabled />
                            </div>
                            
                            <div className="form-group">
                                <label>Ek Bilgi:</label>
                                <input placeholder="Ek Bilgi" name="information" className="form-control"
                                value={this.state.information} disabled />
                            </div>

                            <div className="form-group">
                                <label>Donor Adı:</label>
                                <input placeholder="Donor Adı" name="donorName" className="form-control"
                                value={this.state.donor.name} disabled />
                            </div>

                            <div className="form-group">
                                <label>Müşteri Adı:</label>
                                <input placeholder="Müşteri Adı" name="customerName" className="form-control"
                                value={this.state.customer.name} disabled />
                            </div>
                            
                            <button className="btn btn-primary" onClick={this.back.bind(this)} style={{marginLeft: "10px"}}>Geri</button>
                        </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default ViewProductComponent;