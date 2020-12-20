import React, { Component } from 'react';
import ProductService from '../../services/ProductService';

class ListProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            products :[]
        }
        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
    }
    componentDidMount(){
        ProductService.getAllProducts().then((res) => {
            console.log(res.data);
            this.setState({products : res.data});

        });
    }

    addProduct(){
        this.props.history.push('/add-product/_add');
    }

    viewProduct(id){
        this.props.history.push(`/view-product/${id}`);
    }

    updateProduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    deleteProduct(id){
        ProductService.deleteProduct(id).then(res => {
            ProductService.getAllProducts().then((res) => {
                this.setState({products : res.data});
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Ürün Listesi</h2> 
                     <button type="button" className="btn btn-primary addButton" onClick={this.addProduct}>Ürün Ekle</button>
                 <div className="row">
                    <table className="table table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Adı</th>
                                <th>Açıklaması</th>
                                <th>Durumu</th>
                                <th>Tipi</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    p => 
                                    <tr key = {p.id}> 
                                        <td> {p.name} </td>
                                        <td> {p.definition} </td>
                                        <td> {p.status} </td>
                                        <td> {p.type} </td>
                                        <td>   
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewProduct(p.id)} className="btn btn-success">Görüntüle</button>
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateProduct(p.id)} className="btn btn-info">Güncelle</button>
                                            <button type="button" onClick={() => this.deleteProduct(p.id)} className="btn btn-danger">Sil</button>
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

export default ListProductComponent;