import React, { Component } from 'react';

import DonorService from '../../services/DonorService';

class ViewDonorComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            identityNumber: '',
            name: '',
            surname: '',
            telephone: '',
            address: '', 
            bloodTestPdfFile: '',
            deleted: false,
        }
        this.back = this.back.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            DonorService.getDonorById(this.state.id)
            .then(res => {
                let donor = res.data;
                this.setState({
                    identityNumber: donor.identityNumber,
                    name: donor.name,
                    surname: donor.surname,
                    telephone: donor.telephone,
                    address: donor.address, 
                    bloodTestPdfFile: donor.bloodTestPdfFile,
                });
                console.log('donor: ' + JSON.stringify(donor));
            });
        }  
    }

    back = (event) => {
        this.props.history.push('/donors');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Donor Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Donor No:</label>
                                <input placeholder="####" name="identityNumber" className="form-control"
                                value={this.state.identityNumber} disabled />
                            </div>
                        
                            <div className="form-group">
                                <label>İsim:</label>
                                <input placeholder="Ali" name="name" className="form-control"
                                value={this.state.name} disabled />
                            </div>

                            <div className="form-group">
                                <label>Soyisim:</label>
                                <input placeholder="Yılmaz" name="surname" className="form-control"
                                value={this.state.surname} disabled />
                            </div>

                            <div className="form-group">
                                <label>Telefon:</label>
                                <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="(90)5321234567" name="telephone" className="form-control"
                                value={this.state.telephone} disabled />
                            </div>
                            <div className="form-group">
                                <label>Adres:</label>
                                <input placeholder="Adres" name="address" className="form-control"
                                value={this.state.address} disabled />
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

export default ViewDonorComponent;