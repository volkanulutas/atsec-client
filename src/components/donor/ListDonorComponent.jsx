import React, { Component } from 'react';
import DonorService from '../../services/DonorService';

class ListDonorComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            donors :[]
        }
        this.addDonor = this.addDonor.bind(this);
        this.viewDonor = this.viewDonor.bind(this);
        this.updateDonor = this.updateDonor.bind(this);
    }
    componentDidMount(){
        DonorService.getAllDonors().then((res) => {
            this.setState({donors : res.data});
        }).catch(ex=> {
            console.log(ex);
        });
    }

    addDonor(){
        this.props.history.push('/add-donor/_add');
    }

    viewDonor(id){
        this.props.history.push(`/view-donor/${id}`);
    }

    updateDonor(id){
        this.props.history.push(`/add-donor/${id}`);
    }

    deleteDonor(id){
        DonorService.deleteDonor(id).then(res => {
            DonorService.getAllDonors().then((res) => {
                console.log(res.data);
                this.setState({donors : res.data});
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
                <h2 className="text-center">Donor Listesi</h2> 
                     <button type="button" className="btn btn-primary addButton" onClick={this.addDonor}>Donor Ekle</button>
                <div className="row">
                    <table className="table table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Donor No</th>
                                <th>Adı</th>
                                <th>Soyadı</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.donors.map(
                                    d => 
                                    <tr key = {d.id}> 
                                        <td> {d.identityNumber} </td>
                                        <td> {d.name} </td>
                                        <td> {d.surname} </td>
                                        <td>   
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewDonor(d.id)} className="btn btn-success">Görüntüle</button> 
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateDonor(d.id)} className="btn btn-info">Güncelle</button> 
                                            <button type="button" onClick={() => this.deleteDonor(d.id)} className="btn btn-danger">Sil</button>
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

export default ListDonorComponent;