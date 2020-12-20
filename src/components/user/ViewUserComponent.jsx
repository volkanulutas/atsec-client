import React, { Component } from 'react';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';

class ViewUserComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            surname:'',
            username: '',
            password: '',
            password2: '',
            role: '',
            enabled: true,
            deleted: false,
            allRoles: [],
        }
        this.back = this.back.bind(this);
    } 

    componentDidMount(){
        RoleService.getAllRoles().then(
            (response) => { console.log(response); 
               let roles = response.data;
               this.setState({allRoles: roles});
            },
            (error) => { console.log(error); 
            }
        );


        if(this.state.id === "_add"){
            return;
        }else{
            UserService.getUserById(this.state.id)
            .then(res => {
                let user = res.data;
                this.setState({
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    enabled: user.enabled, 
                    role: user.role,
                });
                console.log('user: ' + JSON.stringify(user));
            });
        }  
    }

    back = (event) => {
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-8 offset-md-3 "> 
                        <h3 className="text-center">Kullanıcı Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Adı:</label>
                                <input placeholder="Ahmet" name="name" className="form-control"
                                value={this.state.name} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Soyadı:</label>
                                <input placeholder="Yılmaz" name="surname" className="form-control"
                                value={this.state.surname} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Kullanıcı Adı:</label>
                                <input placeholder="ela.esmer@atg.eu.com" name="username" className="form-control"
                                value={this.state.username} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Şifre</label>
                                <input placeholder="******" name="username" className="form-control"
                                value={this.state.password} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Rol: {this.state.role}</label>
                                <select className="form-control"  value={this.state.role} >
                                {this.state.allRoles.map((option) => (
                                    <option value={option.name}>{option.name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Aktiflik</label>
                                <input type="checkbox" name="enabled" checked={this.state.enabled} style={{marginLeft:"10px"}} disabled/>
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

export default ViewUserComponent;