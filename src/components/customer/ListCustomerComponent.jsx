import React, { Component } from 'react';
import CustomerService from '../../services/CustomerService';

class ListCustomerComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            customers :[],
            show: false,
        }
        this.viewCustomer = this.viewCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
    }
    
    componentDidMount(){
        CustomerService.getAllCustomers().then((res) => {
            this.setState({customers : res.data});
        }).catch(ex=> {
            console.error(ex);
        });
    }

    setModalShow(modelShowState){
        this.setState({modelShow: modelShowState});
    }

    addCustomer(){
        this.props.history.push('/add-customer/_add');
    }

    viewCustomer(id){
        this.props.history.push(`/view-customer/${id}`);
    }

    updateCustomer(id){
        this.props.history.push(`/add-customer/${id}`);
    }

    deleteCustomer(id){
        CustomerService.deleteCustomer(id).then(res => {
            CustomerService.getAllCustomers().then((res) => {
                console.log(res.data)
                this.setState({customers : res.data});
            }).catch(ex => {
                console.error(ex);
            });
        }).catch(ex=> {
            console.error(ex);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Müşteri Listesi</h2> 
                     <button type="button" className="btn btn-primary addButton" onClick={this.addCustomer}>Müşteri Ekle</button>
                 <div className="row">
                    <table className="table table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Müşteri Kodu</th>
                                <th>Adı</th>
                                <th>Müşteri Tİpİ</th>
                                <th>Açıklama</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    c => 
                                    <tr key = {c.id}> 
                                        <td> {c.identityNumber} </td>
                                        <td> {c.name} </td>
                                        <td> {c.customerType} </td>
                                        <td> {c.definition} </td>
                                        <td> 
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewCustomer(c.id)} className="btn btn-success">Görüntüle</button>  
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateCustomer(c.id)} className="btn btn-info">Güncelle</button> 
                                            <button type="button" onClick={() => this.deleteCustomer(c.id)} className="btn btn-danger">Sil</button>
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

export default ListCustomerComponent;