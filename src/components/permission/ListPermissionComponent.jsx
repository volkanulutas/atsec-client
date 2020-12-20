import React, { Component } from 'react';
import PermissionService from '../../services/PermissionService';

class ListPermissionComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            permissions :[]
        }
        this.addPermission = this.addPermission.bind(this);
        this.updatePermission = this.updatePermission.bind(this);
        this.viewPermission = this.viewPermission.bind(this);
    }

    componentDidMount(){
        PermissionService.getAllPermissions().then((res) => {
            this.setState({permissions : res.data});
        });
    }

    addPermission(){
        this.props.history.push('/add-permission/_add');
    }

    viewPermission(id){
        this.props.history.push(`/view-permission/${id}`);
    }

    updatePermission(id){
        this.props.history.push(`/add-permission/${id}`);
    }

    deletePermission(id){
        PermissionService.deletePermission(id).then(res => {
            PermissionService.getAllPermissions().then((res) => {
                this.setState({permissions : res.data});
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Yetki Listesi</h2> 
                   <button type="button" className="btn btn-primary addButton" onClick={this.addPermission}>Yetki Ekle</button>
                <div className="row">
                    <table className="table table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Adı</th>
                                <th>Açıklama</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.permissions.map(
                                    p => 
                                    <tr key = {p.id}> 
                                        <td> {p.name} </td>
                                        <td> {p.definition} </td>
                                        <td>   
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewPermission(p.id)} className="btn btn-success">Görüntüle</button> 
                                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updatePermission(p.id)} className="btn btn-info">Güncelle</button> 
                                            <button type="button" onClick={() => this.deletePermission(p.id)} className="btn btn-danger">Sil</button>  </td>
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

export default ListPermissionComponent;