import React, { Component } from 'react';

import RoleService from '../../services/RoleService';


class ViewRoleComponent extends Component {
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
        this.back = this.back.bind(this);
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
                    definition: role.definition,
                    permissions: role.permissions,
                });
                console.log('role: ' + JSON.stringify(role));
            }).catch(ex => {
                console.error(ex);
            });
        }  
    }
    
    back = (event) => {
        this.props.history.push('/roles');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Rol Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>İsim:</label>
                                <input placeholder="Role İsmi" name="name" className="form-control"
                                value={this.state.name} disabled/>
                            </div>

                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} disabled/>
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

export default ViewRoleComponent;