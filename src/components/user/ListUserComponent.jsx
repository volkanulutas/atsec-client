import React, { Component } from 'react';
import UserService from '../../services/UserService';

class ListUserComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            users :[]
        }
        this.addUser = this.addUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getAllUsers().then((res) => {
            this.setState({users : res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }

    updateUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    deleteUser(id){
        UserService.deleteUser(id).then(res => {
            UserService.getAllUsers().then((res) => {
                this.setState({users : res.data});
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Kullanıcı Listesi</h2> 
                <div className="row">
                    <button type="button" className="btn btn-primary addButton" onClick={this.addUser}>Kullanıcı Ekle</button>
                </div>
                <div className=" table-responsive">
                    <table className="table table-dark table-striped table-bordered"> 
                        <thead>
                            <tr>
                                <th>Adı</th>
                                <th>Soyadı</th>
                                <th>E-Posta</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    u => 
                                    <tr key = {u.id}> 
                                        <td> {u.name} </td>
                                        <td> {u.surname} </td>
                                        <td> {u.username} </td>
                                        <td>   
                                             <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewUser(u.id)} className="btn btn-success">Görüntüle</button>  
                                             <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateUser(u.id)} className="btn btn-info">Güncelle</button> 
                                             <button type="button" onClick={() => this.deleteUser(u.id)} className="btn btn-danger">Sil</button> 
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

export default ListUserComponent;