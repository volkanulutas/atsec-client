import React, { Component } from 'react';
import RoleService from '../../services/RoleService';

class ListRoleComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            roles :[]
        }
        this.addRole = this.addRole.bind(this);
        this.viewRole = this.viewRole.bind(this);
        this.updateRole = this.updateRole.bind(this);
    }
    componentDidMount(){
        RoleService.getAllRoles().then((res) => {
            this.setState({roles : res.data});
        }).catch(ex =>{
            console.error(ex);
        });
    }

    addRole(){
        this.props.history.push('/add-role/_add');
    }

    updateRole(id){
        this.props.history.push(`/add-role/${id}`);
    }

    viewRole(id){
        this.props.history.push(`/view-role/${id}`);
    }

    deleteRole(id){
        RoleService.deleteRole(id).then(res => {
            RoleService.getAllRoles().then((res) => {
                this.setState({roles : res.data});
            }).catch(ex =>{
                console.error(ex);
            });
        }).catch(ex =>{
            console.error(ex);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Rol Listesi</h2> 
                <div className="row">
                    <button type="button" className="btn btn-primary addButton" onClick={this.addRole}>Rol Ekle</button>
                </div>
                <div className=" table-responsive">
                    <table className="table table-dark table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Adı</th>
                                <th>Açıklama</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.roles.map(
                                    r => 
                                    <tr key = {r.id}> 
                                        <td> {r.name} </td>
                                        <td> {r.definition} </td>
                                
                                        <td>   
                                             <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewRole(r.id)} className="btn btn-success">Görüntüle</button> 
                                             <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateRole(r.id)} className="btn btn-info">Güncelle</button> 
                                             <button type="button" onClick={() => this.deleteRole(r.id)} className="btn btn-danger">Sil</button> 
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListRoleComponent;