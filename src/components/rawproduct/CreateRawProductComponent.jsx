import React, { Component } from 'react';

import RawProductService from '../../services/RawProductService';

import LocationService from '../../services/LocationService';
import DonorService from '../../services/DonorService';
import TissueTypeService from '../../services/TissueTypeService';
import DonorInstituteService from '../../services/DonorInstituteService';

class CreateRawProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            donor: {},
            donorInstitute: {},
            tissueType: {},
            location: {},
            status: '',
            issueTissueDate: '',
            arrivalDate: '',
            information: '',
            deleted: false,

            product_LocationList: [],
            product_DonorList: [],
            product_StatusList: ["Karantina", "Red", "Kabul", "Atanmamış"],
            product_TissueTypeList: [],
            product_DonorInstituteList: [],
        }

        this.changeDonorHandler = this.changeDonorHandler.bind(this);
        this.changeDonorInstituteHandler = this.changeDonorInstituteHandler.bind(this);
        this.changetTissueTypeHandler = this.changetTissueTypeHandler.bind(this);
        this.changeIssueTissueDateHandler = this.changeIssueTissueDateHandler.bind(this);
        this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeInformationHandler = this.changeInformationHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);

        this.saveProduct = this.saveProduct.bind(this);
  } 

    componentDidMount(){
        LocationService.getAllLocations().then(res=> {
            this.setState({product_LocationList: res.data});
         }).catch(ex => {
             console.error(ex);
         });
        DonorService.getAllDonors().then(res=> {
           this.setState({product_DonorList: res.data});
        }).catch(ex => {
            console.error(ex);
        });
        TissueTypeService.getAllTissueTypes().then(res=> {
            this.setState({product_TissueTypeList: res.data});
         }).catch(ex => {
             console.error(ex);
         });
         DonorInstituteService.getAllDonorInstitutes().then(res=> {
            this.setState({product_DonorInstituteList: res.data});
         }).catch(ex => {
             console.error(ex);
         });

        if(this.state.id === "_add"){
            return;
        }else {
            RawProductService.getRawProductById(this.state.id)
            .then(res => {
                let product = res.data;
                this.setState({
                    donor: product.donor,
                    donorInstitute: product.donorInstitute,
                    tissueType: product.tissueType,
                    location: product.location,
                    issueTissueDate: this.convertDate(product.issueTissueDate),
                    arrivalDate: this.convertDate(product.arrivalDate),
                    information: product.information,
                    status: product.status,
                    deleted: product.deleted,
                });
                alert('product: ' + JSON.stringify(product));
            }).catch(ex=> {
                console.error(ex);
            });
        }  
    }

    changeDonorHandler = (event) => {
        let donorParam = this.state.donor;
        donorParam.code = event.target.value;
        this.setState({donor:donorParam});
    }

    changeDonorInstituteHandler = (event) => {
        let donorInstituteParam = this.state.donorInstitute;
        donorInstituteParam.name = event.target.value;
        this.setState({donorInstitute:donorInstituteParam});
    }

    changetTissueTypeHandler = (event) => {
        let tissueTypeParam = this.state.tissueType;
        tissueTypeParam.name = event.target.value;
        this.setState({donorInstitute:tissueTypeParam});
    }

    changeIssueTissueDateHandler = (event) => {
        let date = new Date (event.target.value).getTime();
        this.setState({issueTissueDate:date});
    } 

    changeArrivalDateHandler = (event) => {
        let date = new Date (event.target.value).getTime();
        this.setState({arrivalDate:date});
    } 

    changeLocationNameHandler = (event) => {
        this.setState({location_Name:event.target.value});
    } 

    changeInformationHandler = (event) => {
        this.setState({information:event.target.value});
    }

    changeLocationHandler = (event) => {
        let locationParam = this.state.location;
        locationParam.name = event.target.value;
        this.setState({location:locationParam});
    }

    changeStatusHandler = (event) => {
        this.setState({statut:event.target.value});
    }

    saveProduct = (event) => {
        event.preventDefault();
        let idParam = undefined;
        let statusParam = this.state.product_StatusList[0];
        let typeParam = this.state.product_TypeList[0];
        let donorParam = this.state.product_DonorList[0].id;

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

        let product = {id: idParam, 
            donor: this.state.donor, 
            donorInstitute: this.state.donorInstitute,
            issueTissueDate: this.state.issueTissueDate,
            arrivalDate: this.state.arrivalDate,
            tissueType: this.state.tissueType,
            location: this.state.location, 
            status: this.state.status,
            definition: this.state.definition, 
            information: this.state.information, 
            deleted: this.state.deleted };

        console.log('product: ' + JSON.stringify(product));
        if(this.state.id === "_add"){
            RawProductService.createRawProduct(product).then(res => {
                    this.props.history.push('/products'); 
                }).catch(ex=> {
                    console.error(ex);
            });
        }else { 
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
                                <label>Donor ID:</label>
                                <input placeholder="Donor ID" name="donor_code" className="form-control"
                                value={this.state.donor.code} onChange={this.changeDonorHandler} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Gönderen Kurum: {this.state.donorInstitute.name}</label>
                                <select name="donorInstitute_Name" className="form-control" value={this.state.donorInstitute} onChange={this.changeDonorInstituteHandler}>
                                {this.state.product_DonorInstituteList.map((option) => (
                                    <option value={option.name}>{option.id} - {option.name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Doku Çıkarım Tarihi:</label>
                                <input type="date" id="issueTissueDate" name="issueTissueDate" 
                                 value={this.state.issueTissueDate} onChange={this.changeIssueTissueDateHandler} />
                            </div>
                            <div className="form-group">
                                <label>Merkeze Geliş Tarihi:</label>
                                <input type="date" id="arrivalDate" name="arrivalDate" 
                                 value={this.state.arrivalDate} onChange={this.changeArrivalDateHandler} />
                            </div>
                            <div className="form-group">
                                <label>Doku Tipi: {this.state.tissueType.name}</label>
                                <select name="tissueType_Name" className="form-control"  value={this.state.tissueType.name} onChange={this.changeTissueTypeHandler}>
                                {this.state.product_TissueTypeList.map((option) => (
                                    <option value={option.name}>{option.name}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Karantina Lokasyonu: {this.state.location.name}</label>
                                <select className="form-control"  value={this.state.location.name} onChange={this.changeLocationHandler}>
                                {this.state.product_LocationList.map((option) => (
                                    <option value={option.name}>{option.name}</option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Ek Bilgi:</label>
                                <input placeholder="Ek Bilgi" name="information" className="form-control"
                                value={this.state.information} onChange={this.changeInformationHandler} />
                            </div>

                            <div className="form-group">
                                <label>Durumu: {this.state.status}</label>
                                <select name="status" className="form-control"  value={this.state.status} onChange={this.changeStatusHandler}>
                                {this.state.product_StatusList.map((option) => (
                                    <option value={option.name}>{option.name}</option>
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