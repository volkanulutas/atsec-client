import React, { Component } from 'react';

import PermissionService from '../../services/PermissionService';


class CreatePermissionComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            definition: '',
            deleted: false,
        }
        this.savePermission = this.savePermission.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDefinitionHandler = this.changeDefinitionHandler.bind(this);
        this.changePermissionsHandler = this.changePermissionsHandler.bind(this);
    } 

    componentDidMount(){
        if(this.state.id === "_add"){
            return;
        }else{
            PermissionService.getPermissionById(this.state.id)
            .then(res => {
                let permission = res.data;
                this.setState({
                    name: permission.name,
                    definition: permission.definition,
                });
                console.log('permission: ' + JSON.stringify(permission));
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

    savePermission = (event) => {
        event.preventDefault();
        let idTmp = undefined;
        if(this.state.id !== "_add"){
            idTmp = this.state.id;
       }
        let permission = {id: idTmp, name: this.state.name,  definition: this.state.definition, deleted: this.state.deleted };
        console.log('permission: ' + JSON.stringify(permission));
        if(this.state.id === "_add"){
            PermissionService.createPermission(permission).then(
                (response) => { console.log(response); 
                    this.props.history.push('/permissions'); 
                },
                (error) => { console.log(error); 
                }
            );
        }else{
            PermissionService.updatePermission(this.state.id, permission).then(
                (response) => { console.log(response); 
                    this.props.history.push('/permissions');
                },
                (error) => { console.log(error);
                }
            );
        }   
    }

    cancel = (event) => {
        this.props.history.push('/permissions');
    }

    getTitle()
    {
        if(this.state.id === "_add")
        {
            return <h3 className="text-center">Yetki Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Yetki Güncelle</h3>
        }
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
                                <input placeholder="Yetki İsmi" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>

                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} onChange={this.changeDefinitionHandler} />
                            </div>

                            <button className="btn btn-success" onClick={this.savePermission.bind(this)}>{this.getButtonText()}</button>
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

export default CreatePermissionComponent;