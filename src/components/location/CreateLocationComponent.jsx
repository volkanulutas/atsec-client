import React, { Component } from 'react';

import LocationService from '../../services/LocationService';


class CreateLocationComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            definition: '',
            deleted: false,
            errors: [],
        }
        this.saveLocation = this.saveLocation.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            LocationService.getLocationById(this.state.id)
            .then(res => {
                let location = res.data;
                this.setState({
                    name: location.name,
                    definition: location.definition,
                });
                console.log('location: ' + JSON.stringify(location));
            }).catch(ex=> {
                console.error(ex);
            });
        }  
    }

    changeNameHandler = (event) => {
        this.setState({name:event.target.value});
    }

    changeDefinitionHandler = (event) => {
        this.setState({definition:event.target.value});
    }

    saveLocation = (event) => {
        event.preventDefault();
        var errors = [];
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
        let location = {id: idTmp, name: this.state.name,  definition: this.state.definition, deleted: this.state.deleted };
        console.log('location: ' + JSON.stringify(location));
        if(this.state.id === "_add"){
            LocationService.createLocation(location).then(res => { 
                    console.log(res); 
                    this.props.history.push('/locations'); 
                }).catch(ex => {
                    console.error(ex);
                });
        }else {
            LocationService.updateLocation(this.state.id, location).then(res => { 
                    console.log(res); 
                    this.props.history.push('/locations');
                }).catch(ex => {
                    console.error(ex);
                });
        }   
    }

    cancel = (event) => {
        this.props.history.push('/locationss');
    }

    getTitle(){
        if(this.state.id === "_add") {
            return <h3 className="text-center">Lokasyon Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Lokasyon Güncelle</h3>
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
                                <label>Lokasyon İsmi:</label>
                                <input placeholder="Lokasyon İsmi" name="name" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.name} onChange={this.changeNameHandler} />
                                <div className={this.hasError("name") ? "inline-errormsg" : "hidden"}>
                                    Lokasyon ismini girmelisiniz.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} />
                            </div>

                            <button className="btn btn-success" onClick={this.saveLocation.bind(this)}>{this.getButtonText()}</button>
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

export default CreateLocationComponent;