import React, { Component } from 'react';

import RoleService from '../../services/RoleService';


class CreateRoleComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            isEditable: this.props.match.params.state === "view" ? false : true,
            name: '',
            definition: '', 
            permissions: [],
            deleted: false,
            errors: [],
        }
        this.saveRole = this.saveRole.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
        this.changePermissionsHandler = this.changePermissionsHandler.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            RoleService.getRoleById(this.state.id)
            .then(res => {
                let role = res.data;
                this.setState({
                    id: role.id,
                    name: role.name,
                    deleted: role.deleted,
                    definition: role.definition,
                    permissions: role.permissions,
                });
                console.log('role: ' + JSON.stringify(role));
            }).catch(ex => {
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

    changePermissionsHandler = (event) => {
        this.setState({permissions:event.target.value});
    }

    saveRole = (event) => {
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

        let role = {id: idTmp, name: this.state.name, definition: this.state.definition,
             permissions: this.state.permissions, deleted: this.state.deleted };
        if(this.state.id === "_add"){
            RoleService.createRole(role).then(res => { 
                console.log(res); 
                this.props.history.push('/roles');
            }).catch(ex => {
                console.error(ex);
            });
        }else{    
            RoleService.updateRole(this.state.id, role).then(res => {
                console.log(res); 
                this.props.history.push('/roles');
                }).catch(ex => {
                    console.error(ex);
            });
        }   
    }

    getTitle(){
        if(this.state.id === "_add") {
            return <h3 className="text-center">Rol Ekle</h3>;
        } else{
            return <h3 className="text-center">Rol Güncelle</h3>
        }
    }   
    
    hasError(key){
        return this.state.errors.indexOf(key) !== -1;
    }

    cancel = (event) => {
        this.props.history.push('/roles');
    }

    getButtonText(){
        if(this.state.id === "_add"){
            return "Kaydet";
        } else{
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
                                <label>İsim:</label>
                                <input placeholder="Role İsmi" name="name" 
                                className={this.hasError("name") 
                                ? "form-control is-invalid" 
                                : "form-control"}
                                value={this.state.name} onChange={this.changeNameHandler} 
                                disabled={!this.state.isEditable} />
                                <div className={this.hasError("name") ? "inline-errormsg" : "hidden"}>
                                    İsmi girmelisiniz.
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition"
                                className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} 
                                disabled={!this.state.isEditable} />
                            </div>

                            <button className="btn btn-success" onClick={this.saveRole.bind(this)} disabled={!this.state.isEditable}>{this.getButtonText()}</button>
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

export default CreateRoleComponent;