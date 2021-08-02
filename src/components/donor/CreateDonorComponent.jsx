import React, { Component } from 'react';

import DonorService from '../../services/DonorService';

class CreateDonorComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match === undefined ? "_add" : this.props.match.params.id,
            isEditable: this.props.match === undefined ? true : (this.props.match.params.state === "view" ? false : true),
            code: '',
            citizenshipNumber: '',
            name: '',
            surname: '',
            telephone: '',
            address: '', 
            bloodTestPdfFile: '',
            deleted: false,
            errors: [],
            // modal property
            callbackModalYes: props.callbackModalYes,
            callbackModalNo: props.callbackModalNo,
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
            }).catch(ex => {
                console.error(ex);
            });
        }  
    }

    saveDonor = (event) => {
        event.preventDefault();
        var errors = [];
        if(this.state.name === ""){
            errors.push("name");
        }
        if(this.state.surname === ""){
            errors.push("surname");
        }
        if(this.state.citizenshipNumber === ""){
            errors.push("citizenshipNumber");
        }
        if(this.state.telephone === ""){
            errors.push("telephone");
        }
        if(this.state.address === ""){
            errors.push("address");
        }
       this.setState({errors: errors});
       if(errors.length > 0){
           return false;
       }

        let idParam = undefined;
        if(this.state.id !== "_add"){
            idParam = this.state.id;
        }
        let donor = {id: idParam, code: this.state.code, citizenshipNumber: this.state.citizenshipNumber,  name: this.state.name, 
            surname: this.state.surname, address: this.state.address, telephone: this.state.telephone, deleted: this.state.deleted };
        console.log('donor: ' + JSON.stringify(donor));
        if(this.state.id === "_add"){ // create user
            DonorService.createDonor(donor).then(res => { 
                console.log(res); 
                this.props.history.push('/donors'); 
                }).catch(ex => {
                    console.error(ex);
                });
        }else{     // TODO: alert basarili
            DonorService.updateDonor(this.state.id, donor).then(res => { 
                console.log(res); 
                this.props.history.push('/donors');
            }).catch(ex => {
                console.error(ex); 
            });
        } 
        
        // If opened as modal
        if(this.state.callbackModalYes){
            this.state.callbackModalYes();
        }
    }

    cancel = (event) => {
        // If opened as modal
        if(this.state.callbackModalNo){
            this.state.callbackModalNo();
        } else {
            this.props.history.push('/donors');
        }        
    }

    getTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Donor Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Donor Güncelle</h3>
        }
    }

    getButtonText(){
        if(this.state.id === "_add"){
            return "Kaydet";
        }
        else{
            return "Güncelle";
        }
    }

    hasError(key){
        return this.state.errors.indexOf(key) !== -1;
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
                                <input placeholder="Ali" name="name"
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.name} onChange={this.changeNameHandler}
                                disabled={!this.state.isEditable} />
                                <div className={this.hasError("name") ? "inline-errormsg" : "hidden"}>
                                       Adı girmelisiniz.
                                   </div>
                            </div>
                            <div className="form-group">
                                <label>Donor Soyadı:</label>
                                <input placeholder="Yılmaz" name="surname" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.surname} onChange={this.changeSurnameHandler}
                                disabled={!this.state.isEditable} />
                                <div className={this.hasError("surname") ? "inline-errormsg" : "hidden"}>
                                       Soyadı girmelisiniz.
                                   </div>
                            </div>
                            <div className="form-group">
                                <label>T.C. Numarası:</label>
                                <input placeholder="10203320214" name="citizenshipNumber" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.citizenshipNumber} onChange={this.changeCitizenshipNumberHandler} 
                                disabled={!this.state.isEditable}/>
                                <div className={this.hasError("citizenshipNumber") ? "inline-errormsg" : "hidden"}>
                                    TC numarası uygun formatta değil veya girilmemiş.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Telefon:</label>
                                <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="(90)5321234567" name="telephone" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.telephone} onChange={this.changeTelephoneHandler}
                                disabled={!this.state.isEditable} />
                                <div className={this.hasError("telephone") ? "inline-errormsg" : "hidden"}>
                                    Telefon formatta değil veya girilmemiş.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Adres:</label>
                                <input placeholder="Adres" name="address" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.address} onChange={this.changeAddressHandler}
                                disabled={!this.state.isEditable} />
                                <div className={this.hasError("address") ? "inline-errormsg" : "hidden"}>
                                       Adres girmelisiniz.
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={this.saveDonor.bind(this)} disabled={!this.state.isEditable}>{this.getButtonText()}</button>
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