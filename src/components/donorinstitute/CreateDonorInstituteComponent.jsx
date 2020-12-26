import React, { Component } from 'react';

import DonorInstituteService from '../../services/DonorInstituteService';


class CreateDonorInstituteComponent extends Component {
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
                });
                console.log('dI: ' + JSON.stringify(dI));
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
        let idTmp = undefined;
        if(this.state.id !== "_add"){
            idTmp = this.state.id;
       }

        let dI = {id: idTmp, name: this.state.name, code: this.state.code,
             rawProducts: this.state.rawProducts, deleted: this.state.deleted };
        if(this.state.id === "_add"){ // create user
            DonorInstituteService.createDonorInstitute(dI).then(
                (response) => { console.log(response); 
                    this.props.history.push('/donorinstitutes'); 
                },
                (error) => { console.log(error); 
                }
            );
        }else{    
            DonorInstituteService.updateDonorInstitute(this.state.id, dI).then(res => { console.log(res); 
                    this.props.history.push('/donorinstitutes');
                }
            ).catch(ex=> {
                console.error(ex);
            });
        }   
    }

    getTitle(){
        if(this.state.id === "_add")
        {
            return <h3 className="text-center">Kurum Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Kurum Güncelle</h3>
        }
    }

    cancel = (event) => {
        this.props.history.push('/donorinstitutes');
    }

    getButtonText() {
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
                                <label>Kurum Kodu:</label>
                                <input placeholder="Kurum Kodu" name="code" className="form-control"
                                value={this.state.code} onChange={this.changeCodeHandler} />
                            </div>

                            <div className="form-group">
                                <label>Kurum Adı:</label>
                                <input placeholder="Kurum Adı" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>

                            <button className="btn btn-success" onClick={this.saveDonorInstitute.bind(this)}>{this.getButtonText()}</button>
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