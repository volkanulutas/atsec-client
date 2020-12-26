import React, { Component } from 'react';
import  DonorInstituteService from '../../services/DonorInstituteService';

class ListDonorInstituteComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            donorInstitutes :[]
        }
        this.addDonorInstitute = this.addDonorInstitute.bind(this);
        this.viewDonorInstitute = this.viewDonorInstitute.bind(this);
        this.updateDonorInstitute = this.updateDonorInstitute.bind(this);
    }
    componentDidMount(){
        DonorInstituteService.getAllDonorInstitutes().then((res) => {
            this.setState({donorInstitutes : res.data});
        }).catch(ex =>{
            console.error(ex);
        });
    }

    addDonorInstitute(){
        this.props.history.push('/add-donorinstitute/_add');
    }

    updateDonorInstitute(id){
        this.props.history.push(`/add-donorinstitute/${id}`);
    }

    viewDonorInstitute(id){
        this.props.history.push(`/view-donorinstitute/${id}`);
    }

    deleteDonorInstitute(id){
        DonorInstituteService.deleteDonorInstitute(id).then(res => {
            DonorInstituteService.getAllDonorInstitutes().then((res) => {
                this.setState({donorInstitutes : res.data});
            }).catch(ex =>{
                console.error(ex);
            });
        }).catch(ex =>{
            console.error(ex);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Donor Kurum Listesi</h2> 
                <div className="row">
                    <button type="button" className="btn btn-primary addButton" onClick={this.addDonorInstitute}>Kurum Ekle</button>
                </div>
                <div className=" table-responsive">
                    <table className="table table-dark table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Kurum Kodu</th>
                                <th>Adı</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.donorInstitutes.map(
                                    dI => 
                                    <tr key = {dI.id}> 
                                        <td> {dI.code} </td>         
                                        <td> {dI.name} </td>                           
                                        <td>   
                                             <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewDonorInstitute(dI.id)} className="btn btn-success">Görüntüle</button> 
                                             <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateDonorInstitute(dI.id)} className="btn btn-info">Güncelle</button> 
                                             <button type="button" onClick={() => this.deleteDonorInstitute(dI.id)} className="btn btn-danger">Sil</button> 
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

export default ListDonorInstituteComponent;