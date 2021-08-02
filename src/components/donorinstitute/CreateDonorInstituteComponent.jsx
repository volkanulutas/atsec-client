import React, { Component } from 'react';


import DonorInstituteService from '../../services/DonorInstituteService';

class CreateDonorInstituteComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match === undefined ? "_add" : this.props.match.params.id,
            isEditable: this.props.match === undefined ? true : (this.props.match.params.state === "view" ? false : true),
            code: '',
            name: '', 
            rawProducts: [],
            deleted: false,
            errors: [],
            // modal property
            callbackModalYes: props.callbackModalYes,
            callbackModalNo: props.callbackModalNo,
        }
        this.saveDonorInstitute = this.saveDonorInstitute.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
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
                    code: dI.code,
                    name: dI.name,
                    rawProducts: dI.rawProducts,
                    deleted: dI.deleted,
                }).catch(ex => {
                    console.error(ex);
                });
                console.log('dI: ' + JSON.stringify(dI));
            }).catch(ex => {
                console.error(ex);
            });
        }  
    }

    changeNameHandler = (event) => {
        this.setState({name:event.target.value});
    }

    changeCodeHandler = (event) => {
        this.setState({code:event.target.value});
    }

    saveDonorInstitute = (event) => {
        event.preventDefault();

        var errors = [];
        if(this.state.code === ""){
            errors.push("code");
        }
        if(this.state.name === ""){
            errors.push("name");
        }

       this.setState({errors: errors});
       if(errors.length > 0){
           return false;
       }

       let idTmp = undefined;
       if(this.state.id !== "_add"){
           idTmp = this.state.id;
        }

        let dI = {id: idTmp, name: this.state.name, code: this.state.code,
             rawProducts: this.state.rawProducts, deleted: this.state.deleted };
        if(this.state.id === "_add"){ // create user
            DonorInstituteService.createDonorInstitute(dI).then(res => { 
                console.log(res);
                this.props.history.push('/donorinstitutes'); 
            }).catch(ex => {
                console.error(ex);
            });
        }else{    
            DonorInstituteService.updateDonorInstitute(this.state.id, dI).then(res => {
                    console.log(res); 
                    this.props.history.push('/donorinstitutes');
                }).catch(ex=> {
                    console.error(ex);
            });
        }   
        
        // If opened as modal
        if(this.state.callbackModalYes){
            this.state.callbackModalYes();
        }
    }

    getTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Kurum Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Kurum Güncelle</h3>
        }
    }

    cancel = (event) => {
        // If opened as modal
        if(this.state.callbackModalNo){
            this.state.callbackModalNo();
        } else {
            this.props.history.push('/donorinstitutes');
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
                        <div className= "card-body">
                        <form>
                            <div className="form-group">
                                <label>Kurum Kodu:</label>
                                <input placeholder="Kurum Kodu..." name="code" 
                                className={this.hasError("code") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.code} onChange={this.changeCodeHandler} 
                                disabled={!this.state.isEditable}/>
                                <div className={this.hasError("code") ? "inline-errormsg" : "hidden"}>
                                    Kurum kodunu girmelisiniz.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Kurum Adı:</label>
                                <input placeholder="Kurum Adı..." name="name" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.name} onChange={this.changeNameHandler} 
                                disabled={!this.state.isEditable}/>
                                <div className={this.hasError("code") ? "inline-errormsg" : "hidden"}>
                                    Kurum adını girmelisiniz.
                                </div>
                            </div>

                            <button className="btn btn-success" onClick={this.saveDonorInstitute.bind(this)} disabled={!this.state.isEditable}>{this.getButtonText()} </button>
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

export default CreateDonorInstituteComponent;