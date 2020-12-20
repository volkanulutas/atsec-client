import React, { Component } from 'react';

import ProductService from '../../services/ProductService';
import DonorService from '../../services/DonorService';
import CustomerService from '../../services/CustomerService';

class CreateProductComponent extends Component {
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
            donorId: '',
            customerId: '',
            deleted: false,


            productDonorList: [],
            productCustomerList: [],
            productStatusList: [ "Karantina", "Stok", "Numune", "Zaiyat", "Geri Çağrılmış"],
            productTypeList: ["NONE"],
        }
        this.saveProduct = this.saveProduct.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeExpirationDateHandler = this.changeExpirationDateHandler.bind(this);
        this.changeSplitLengthHandler = this.changeSplitLengthHandler.bind(this);
        this.changeInformationHandler = this.changeInformationHandler.bind(this);
        this.changeSecCodeHandler = this.changeSecCodeHandler.bind(this);
        this.changeDonorIdHandler = this.changeDonorIdHandler.bind(this);
        this.changeCustomerIdHandler = this.changeCustomerIdHandler.bind(this);
    } 

    componentDidMount(){
        DonorService.getAllDonors().then(res=> {
           this.setState({productDonorList: res.data});
        }).catch(ex => {
            console.error(ex);
        });

        CustomerService.getAllCustomers().then(res=> {
            this.setState({productCustomerList: res.data});
         }).catch(ex => {
            console.error(ex);
         });

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
                    customerId: product.customerId,
                    donorId: product.donorId,
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

    changeDefinitionHandler = (event) => {
        this.setState({definition:event.target.value});
    }

    changeStatusHandler = (event) => {
        this.setState({status:event.target.value});
    }

    changeTypeHandler = (event) => {
        this.setState({type:event.target.value});
    }

    changeExpirationDateHandler = (event) => {
        this.setState({expirationDate:event.target.value});
    }

    changeSplitLengthHandler = (event) => {
        this.setState({splitLength:event.target.value});
    }

    changeInformationHandler = (event) => {
        this.setState({information:event.target.value});
    }

    changeSecCodeHandler = (event) => {
        this.setState({secCode:event.target.value});
    }

    changeDonorIdHandler = (event) => {
        this.setState({donorId:event.target.value});
    }

    changeCustomerIdHandler = (event) => {
        this.setState({customerId:event.target.value});
    }

    saveProduct= (event) => {
        event.preventDefault();
        let idParam = undefined;
        let statusParam = this.state.productStatusList[0];
        let typeParam = this.state.productTypeList[0];
        let donorParam = this.state.productDonorList[0].id;
        let customerParam = this.state.productCustomerList[0].id;

        if(this.state.id !== "_add"){
            idParam = this.state.id;
        }
        if(this.state.status !== ""){
            statusParam = this.state.status;
        }
        if(this.state.type !== ""){
            typeParam = this.state.type;
        }
        if(this.state.donorId !== ""){
            donorParam = this.state.donorId;
        }
        if(this.state.customerId !== ""){
            customerParam = this.state.customerId;
        }

        let product = {id: idParam, name: this.state.name, definition: this.state.definition,
        status:  statusParam, type: typeParam, expirationDate: this.state.expirationDate, splitLength: this.state.splitLength,
        information: this.state.information, secCode: this.state.secCode,  donorId: donorParam,  customerId: customerParam, deleted: this.state.deleted };
        alert('product: ' + JSON.stringify(product));
        if(this.state.id === "_add"){
            ProductService.createProduct(product).then(res => {
                    this.props.history.push('/products'); 
                }).catch(ex=> {
                console.error(ex);
            });
        }else{ 
            ProductService.updateProduct(this.state.id, product).then(res => { 
                    this.props.history.push('/products');
                }).catch(ex=> {
                console.error(ex);
            });
        }   
    }

    cancel = (event) => {
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id === "_add")
        {
            return <h3 className="text-center">Ürün Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Ürün Güncelle</h3>
        }
    }

    getButtonText() {
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
                                <label>SKT:</label>
                                <input type="date" id="expirationDate" name="expirationDate" 
                                 value={this.state.expirationDate} onChange={this.changeExpirationDateHandler} />
                            </div>

                            <div className="form-group">
                                <label>Parça No:</label>
                                <input placeholder="1" name="splitLength" className="form-control"
                                value={this.state.splitLength} onChange={this.changeSplitLengthHandler} />
                            </div>
                            
                            <div className="form-group">
                                <label>Ek Bilgi:</label>
                                <input placeholder="Ek Bilgi" name="information" className="form-control"
                                value={this.state.information} onChange={this.changeInformationHandler} />
                            </div>

                            <div className="form-group">
                                <label>Donor:</label>
                                <select className="form-control"  value={this.state.donorId} onChange={this.changeDonorIdHandler}>
                                {this.state.productDonorList.map((option) => (
                                    <option value={option.id}>{option.id} - {option.name} {option.surname}</option>
                                ))}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label>Müşteri:</label>
                                <select className="form-control"  value={this.state.customerId} onChange={this.changeCustomerIdHandler}>
                                {this.state.productCustomerList.map((option) => (
                                    <option value={option.id}>{option.id} - {option.name}</option>
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

export default CreateProductComponent;