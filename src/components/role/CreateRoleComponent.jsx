import React, { Component } from 'react';

import RoleService from '../../services/RoleService';


class CreateRoleComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            definition: '', 
            permissions: [],
            deleted: false,
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
        let idTmp = undefined;
        if(this.state.id !== "_add"){
            idTmp = this.state.id;
       }

        let role = {id: idTmp, name: this.state.name, definition: this.state.definition,
             permissions: this.state.permissions, deleted: this.state.deleted };
        if(this.state.id === "_add"){ // create user
            RoleService.createRole(role).then(
                (response) => { console.log(response); 
                    this.props.history.push('/roles'); 
                },
                (error) => { console.log(error); 
                }
            );
        }else{    
            RoleService.updateRole(this.state.id, role).then(res => { console.log(res); 
                    this.props.history.push('/roles');
                }
            ).catch(ex=> {
                console.error(ex);
            });
        }   
    }

    getTitle()
    {
        if(this.state.id === "_add")
        {
            return <h3 className="text-center">Rol Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Rol Güncelle</h3>
        }
    }

    cancel = (event) => {
        this.props.history.push('/roles');
    }

    getButtonText()
    {
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
                                <label>İsim:</label>
                                <input placeholder="Role İsmi" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>

                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} />
                            </div>

                            <button className="btn btn-success" onClick={this.saveRole.bind(this)}>{this.getButtonText()}</button>
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