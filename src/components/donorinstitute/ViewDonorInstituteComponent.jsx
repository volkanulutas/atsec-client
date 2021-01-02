import React, { Component } from 'react';

import DonorInstituteService from '../../services/DonorInstituteService';


class ViewDonorInstituteComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            code: '',
            name: '', 
            rawProducts: [],
            deleted: false,
        }
        this.back = this.back.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            DonorInstituteService.getDonorInstituteById(this.state.id)
            .then(res => {
                let dI = res.data;
                this.setState({
                    id: dI.id,
                    name: dI.name,
                    code: dI.code,
                    rawProducts: dI.rawProducts,
                    deleted: dI.deleted,
                });
                console.log('dI: ' + JSON.stringify(dI));
            }).catch(ex => {
                console.error(ex);
            });
        }  
    }
    
    back = (event) => {
        this.props.history.push('/donorinstitutes');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Donör Kurum Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Kurum Kodu:</label>
                                <input placeholder="Kurum Kodu" name="code" className="form-control"
                                value={this.state.code} disabled/>
                            </div>

                            <div className="form-group">
                                <label>Kurum Adı:</label>
                                <input placeholder="Kurum Adı" name="name" className="form-control"
                                value={this.state.name} disabled/>
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

export default ViewDonorInstituteComponent;