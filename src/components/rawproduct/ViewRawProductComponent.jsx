import React, { Component } from 'react';

import RawProductService from '../../services/RawProductService';
import DonorService from '../../services/DonorService';

class ViewRawProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            location: '',
            definition: '',
            status: '',
            type: '',
            acceptanceDate: '',
            information: '',
            donorCode: '',
            deleted: false,

            productLocationList: [],
            productDonorList: [],
            productStatusList: [ "Karantina", "Stok", "Numune", "Zaiyat", "Geri Çağrılmış"],
            productTypeList: ["NONE"],
        }
        this.back = this.back.bind(this);
    } 

    componentDidMount(){
        DonorService.getAllDonors().then(res=> {
            this.setState({productDonorList: res.data});
         }).catch(ex => {
             console.error(ex);
         });
 
          RawProductService.getAllProductLocations().then(res=> {
             this.setState({productLocationList: res.data});
          }).catch(ex => {
             console.error(ex);
          });

        if(this.state.id === "_add"){
            return;
        }else{
            RawProductService.getRawProductById(this.state.id)
            .then(res => {
                let product = res.data;
                this.setState({
                    name: product.name,
                    location: product.location,
                    definition: product.definition,
                    status: product.status,
                    donorCode: product.donorCode,
                    type: product.type,
                    acceptanceDate: product.acceptanceDate, 
                    information: product.information,
                });
                console.log('product: ' + JSON.stringify(product));
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
                    <h3 className="text-center">Ham Ürün Görüntüle</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Adı:</label>
                                <input placeholder="Adı" name="name" className="form-control"
                                value={this.state.name} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} disabled />
                            </div>

                            <div className="form-group">
                                <label>Durumu: {this.state.status}</label>
                                <select className="form-control"  value={this.state.status} disabled>
                                {this.state.productStatusList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tipi: {this.state.type}</label>
                                <select className="form-control"  value={this.state.type} disabled>
                                {this.state.productTypeList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Kabul Tarihi:</label>
                                <input type="date" id="acceptanceDate" name="acceptanceDate" 
                                 value={this.state.acceptanceDate} disabled />
                            </div>
                            <div className="form-group">
                                <label>Ek Bilgi:</label>
                                <input placeholder="Ek Bilgi" name="information" className="form-control"
                                value={this.state.information} disabled />
                            </div>

                            <div className="form-group">
                                <label>Donor:</label>
                                <select className="form-control"  value={this.state.donorCode} disabled>
                                {this.state.productDonorList.map((option) => (
                                    <option value={option.code}></option>
                                ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Donor Kurumu:</label>
                                <select className="form-control"  value={this.state.location} disabled>
                                {this.state.productLocationList.map((option) => (
                                    <option value={option}></option>
                                ))}
                                </select>
                            </div>
                            
                            <button className="btn btn-danger" onClick={this.back.bind(this)} style={{marginLeft: "10px"}}>Geri</button>
                        </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default ViewRawProductComponent;