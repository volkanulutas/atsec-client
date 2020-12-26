import React, { Component } from 'react';

import RawProductService from '../../services/RawProductService';
import DonorService from '../../services/DonorService';

class CreateRawProductComponent extends Component {
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
        this.saveProduct = this.saveProduct.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeAcceptanceDateHandler = this.changeAcceptanceDateHandler.bind(this);
        this.changeInformationHandler = this.changeInformationHandler.bind(this);
        this.changeDonorCodeHandler = this.changeDonorCodeHandler.bind(this);
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
                    type: product.type,
                    acceptanceDate: this.convertDate(product.acceptanceDate),
        
                    donorCode: product.donorCode,
                });
                console.log('product: ' + JSON.stringify(product));
            }).catch(ex=> {
                console.error("ex");
            });
        }  
    }

    changeNameHandler = (event) => {
        this.setState({name:event.target.value});
    }

    changeLocationHandler = (event) => {
        this.setState({location:event.target.value});
    }

    changeDefinitionHandler = (event) => {
        this.setState({definition:event.target.value});
    }

    changeAcceptanceDateHandler = (event) => {
        let date = new Date (event.target.value).getTime();
        this.setState({acceptanceDate:date});
    }

    changeStatusHandler = (event) => {
        this.setState({status:event.target.value});
    }

    changeTypeHandler = (event) => {
        this.setState({type:event.target.value});
    }

    changeInformationHandler = (event) => {
        this.setState({information:event.target.value});
    }

    changeDonorCodeHandler = (event) => {
        this.setState({donorCode:event.target.value});
    }

    saveProduct = (event) => {
        event.preventDefault();
        let idParam = undefined;
        let statusParam = this.state.productStatusList[0];
        let typeParam = this.state.productTypeList[0];
        let donorParam = this.state.productDonorList[0].id;

        if(this.state.id !== "_add"){
            idParam = this.state.id;
        }
        if(this.state.status !== ""){
            statusParam = this.state.status;
        }
        if(this.state.type !== ""){
            typeParam = this.state.type;
        }
        if(this.state.donorCode !== ""){
            donorParam = this.state.donorCode;
        }

        let product = {id: idParam, name: this.state.name, location: this.state.location, definition: this.state.definition,
        status:  statusParam, type: typeParam, acceptanceDate: this.state.acceptanceDate,
        information: this.state.information, donorCode: donorParam, deleted: this.state.deleted };
        console.log('product: ' + JSON.stringify(product));
        if(this.state.id === "_add"){
            RawProductService.createRawProduct(product).then(res => {
                    this.props.history.push('/products'); 
                }).catch(ex=> {
                console.error(ex);
            });
        }else{ 
            RawProductService.updateRawProduct(this.state.id, product).then(res => { 
                    this.props.history.push('/products');
                }).catch(ex=> {
                console.error(ex);
            });
        }   
    }

    cancel = (event) => {
        this.props.history.push('/rawproducts');
    }

    getTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Ham Ürün Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Ham Ürün Güncelle</h3>
        }
    }

    getButtonText() {
        if(this.state.id === "_add"){
            return "Kaydet";
        }
        else{
            return "Güncelle";
        }
    }

    convertDate(dateLong){
        if(dateLong !== undefined){
            let date = new Date(dateLong);
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getUTCDate();
            return year + "-"+month+"-"+day;
        }
        return undefined;
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
                                <label>Adı:</label>
                                <input placeholder="Adı" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>
                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} />
                            </div>

                            <div className="form-group">
                                <label>Durumu: {this.state.status}</label>
                                <select className="form-control"  value={this.state.status} onChange={this.changeStatusHandler}>
                                {this.state.productStatusList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tipi: {this.state.type}</label>
                                <select className="form-control"  value={this.state.type} onChange={this.changeTypeHandler}>
                                {this.state.productTypeList.map((option) => (
                                    <option value={option}>{option}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Kabul Tarihi:</label>
                                <input type="date" id="acceptanceDate" name="acceptanceDate" 
                                 value={this.state.acceptanceDate} onChange={this.changeAcceptanceDateHandler} />
                            </div>
                            <div className="form-group">
                                <label>Ek Bilgi:</label>
                                <input placeholder="Ek Bilgi" name="information" className="form-control"
                                value={this.state.information} onChange={this.changeInformationHandler} />
                            </div>

                            <div className="form-group">
                                <label>Donor:</label>
                                <select className="form-control"  value={this.state.donorCode} onChange={this.changeDonorCodeHandler}>
                                {this.state.productDonorList.map((option) => (
                                    <option value={option.donorCode}></option>
                                ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Donor Kurumu:</label>
                                <select className="form-control"  value={this.state.location} onChange={this.changeLocationHandler}>
                                {this.state.productLocationList.map((option) => (
                                    <option value={option}></option>
                                ))}
                                </select>
                            </div>
                            
                            <button className="btn btn-success" onClick={this.saveProduct.bind(this)}>{this.getButtonText()}</button>
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

export default CreateRawProductComponent;