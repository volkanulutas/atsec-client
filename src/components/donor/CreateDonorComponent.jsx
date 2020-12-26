import React, { Component } from 'react';

import DonorService from '../../services/DonorService';

class CreateDonorComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            code: '',
            citizenshipNumber: '',
            name: '',
            surname: '',
            telephone: '',
            address: '', 
            bloodTestPdfFile: '',
            deleted: false,
        }
        this.saveDonor = this.saveDonor.bind(this);
        this.changeCitizenshipNumberHandler = this.changeCitizenshipNumberHandler.bind(this);
        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeTelephoneHandler = this.changeTelephoneHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
    } 

    changeCodeHandler = (event) => {
        this.setState({code:event.target.value});
    }

    changeCitizenshipNumberHandler = (event) => {
        this.setState({citizenshipNumber:event.target.value});
    }

    changeNameHandler = (event) => {
        this.setState({name:event.target.value});
    }

    changeSurnameHandler = (event) => {
        this.setState({surname:event.target.value});
    }

    changeTelephoneHandler = (event) => {
        this.setState({telephone:event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address:event.target.value});
    }

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            DonorService.getDonorById(this.state.id)
            .then(res => {
                let donor = res.data;
                this.setState({
                    code: donor.code,
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

    saveDonor = (event) => {
        event.preventDefault();
        let idParam = undefined;
        if(this.state.id !== "_add"){
            idParam = this.state.id;
        }

        let donor = {id: idParam, code: this.state.code, citizenshipNumber: this.state.citizenshipNumber,  name: this.state.name, surname: this.state.surname, address: this.state.address, telephone: this.state.telephone, deleted: this.state.deleted };
        console.log('donor: ' + JSON.stringify(donor));
        if(this.state.id === "_add"){ // create user
            DonorService.createDonor(donor).then(
                (response) => { console.log(response); 
                    this.props.history.push('/donors'); 
                },
                (error) => { console.log(error); 
                }
            );
        }else{     // TODO: alert basarili
            DonorService.updateDonor(this.state.id, donor).then(
                (response) => { console.log(response); 
                    this.props.history.push('/donors');
                },
                (error) => { console.log(error);
                }
            );
        }   
    }

    cancel = (event) => {
        this.props.history.push('/donors');
    }

    getTitle(){
        if(this.state.id === "_add")
        {
            return <h3 className="text-center">Donor Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Donor Güncelle</h3>
        }
    }

    getButtonText(){
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
                                <label>Donor Adı:</label>
                                <input placeholder="Ali" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>
                            <div className="form-group">
                                <label>Donor Soyadı:</label>
                                <input placeholder="Yılmaz" name="surname" className="form-control"
                                value={this.state.surname} onChange={this.changeSurnameHandler} />
                            </div>
                            <div className="form-group">
                                <label>TC Numarası:</label>
                                <input placeholder="10203320214" name="citizenshipNumber" className="form-control"
                                value={this.state.citizenshipNumber} onChange={this.changeCitizenshipNumberHandler} />
                            </div>
                            <div className="form-group">
                                <label>Telefon:</label>
                                <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="(90)5321234567" name="telephone" className="form-control"
                                value={this.state.telephone} onChange={this.changeTelephoneHandler} />
                            </div>
                            <div className="form-group">
                                <label>Adres:</label>
                                <input placeholder="Adres" name="address" className="form-control"
                                value={this.state.address} onChange={this.changeAddressHandler} />
                            </div>
                            <button className="btn btn-success" onClick={this.saveDonor.bind(this)}>{this.getButtonText()}</button>
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

export default CreateDonorComponent;