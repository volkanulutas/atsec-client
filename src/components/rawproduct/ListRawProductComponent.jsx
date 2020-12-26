import React, { Component } from 'react';
import RawProductService from '../../services/RawProductService';

class ListRawProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            products :[]
        }
        this.addRawProduct = this.addRawProduct.bind(this);
        this.updateRawProduct = this.updateRawProduct.bind(this);
        this.viewRawProduct = this.viewRawProduct.bind(this);
    }
    componentDidMount(){
        RawProductService.getAllRawProducts().then((res) => {
            console.log(res.data);
            this.setState({products : res.data});
        });
    }

    addRawProduct(){
        this.props.history.push('/add-rawproduct/_add');
    }

    viewRawProduct(id){
        this.props.history.push(`/view-rawproduct/${id}`);
    }

    updateRawProduct(id){
        this.props.history.push(`/add-rawproduct/${id}`);
    }

    deleteRawProduct(id){
        RawProductService.deleteRawProduct(id).then(res => {
            RawProductService.getAllRawProducts().then((res) => {
                this.setState({products : res.data});
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Ham Ürün Listesi</h2> 
                     <button type="button" className="btn btn-primary addButton" onClick={this.addProduct}>Ürün Ekle</button>
                 <div className="row">
                    <table className="table table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Donor Kodu</th>
                                <th>Yerİ</th>
                                <th>Durumu</th>
                                <th>Tİpİ</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    p => 
                                    <tr key = {p.id}> 
                                        <td> {p.donorCode} </td>
                                        <td> {p.location} </td>
                                        <td> {p.status} </td>
                                        <td> {p.type} </td>
                                        <td>   
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewRawProduct(p.id)} className="btn btn-success">Görüntüle</button>
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateRawProduct(p.id)} className="btn btn-info">Güncelle</button>
                                            <button type="button" onClick={() => this.deleteRawProduct(p.id)} className="btn btn-danger">Sil</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListRawProductComponent;