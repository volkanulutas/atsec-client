import React, { Component } from 'react';
import ReactFormInputValidation from "react-form-input-validation";

import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';

class CreateUserComponent extends Component {
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
            success: false,
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEnabledHandler = this.changeEnabledHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.changePassword1Handler = this.changePassword1Handler.bind(this);
        this.changePassword2Handler = this.changePassword2Handler.bind(this);
    } 

    componentDidMount(){
        RoleService.getAllRoles().then(
            (response) => { console.log(response); 
               let roles = response.data;
               this.setState({allRoles: roles});
            }
        ).catch(ex=>{
            console.error(ex);
        });


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
            }).catch(ex=>{
                console.error(ex);
            });
        }  
    }

    saveUser = (event) => {
        event.preventDefault();

        let idTmp = undefined;
        let roleTmp = this.state.allRoles[0].id;
        if(this.state.role !== ""){
            roleTmp = this.state.role;
        }
        if(this.state.id !== "_add"){
             idTmp = this.state.id;
        }
        let user = {id: idTmp, name: this.state.name, surname: this.state.surname, username: this.state.username, 
            password: this.state.password, enabled: this.state.enabled, role: roleTmp};
        console.log('user: ' + JSON.stringify(user));
        if(this.state.id === "_add"){
            UserService.createUser(user).then(res => {
                 this.props.history.push('/users');
            }).catch(ex=> {
                console.error(ex);
            });  
        }else{
            UserService.updateUser(this.state.id, user).then(res => {
                 this.props.history.push('/users');
            }).catch(ex=> {
                console.error(ex);
            });
        }   
    }
    cancel = (event) => {
        this.props.history.push('/users');
    }

    changeNameHandler = (event) => {
        this.setState({name:event.target.value});
    }

    changeSurnameHandler = (event) => {
        this.setState({surname:event.target.value});
    }

    changeUsernameHandler = (event) => {
        this.setState({username:event.target.value});
    }

    changeEnabledHandler = (event) => {
        this.setState({enabled:event.target.checked});
    }

    changePassword1Handler=(event) => {
        this.setState({password:event.target.value});
        // TODO: passwordlerin ayni olmasını anlik kontrol et
    }

    changePassword2Handler = (event) => {
        this.setState({password2:event.target.value});
        // TODO: passwordlerin ayni olmasını anlik kontrol et
    }

    changeRoleHandler = (event) => {
        this.setState({role:event.target.value}); 
    }

    getUsername()
    {
        if(this.state.id === "_add"){
            return <div className="form-group">
                        <label>Kullanıcı Adı:</label>
                        <input placeholder="ayilmaz@atg.eu.com" name="username" className="form-control"
                        value={this.state.username} onChange={this.changeUsernameHandler} />
                    </div>;
        }else{
            return <div className="form-group">
            <label>Kullanıcı Adı:</label>
            <input placeholder="ayilmaz@atg.eu.com" name="username" className="form-control"
            value={this.state.username} onChange={this.changeUsernameHandler}  disabled/>
        </div>;
        }
    }

    getTitle(){
        if(this.state.id === "_add"){
            return <h3 className="text-center">Kullanıcı Ekle</h3>;
        }
        else{
            return <h3 className="text-center">Kullanıcı Güncelle</h3>
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
                                <label>Adı:</label>
                                <input placeholder="Ahmet" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                            </div>
                            <div className="form-group">
                                <label>Soyadı:</label>
                                <input placeholder="Yılmaz" name="surname" className="form-control"
                                value={this.state.surname} onChange={this.changeSurnameHandler} />
                            </div>
                            {this.getUsername()}
                            <div className="form-group">
                                <label>Şifre:</label>
                                <input placeholder="******" name="username" className="form-control"
                                value={this.state.password} onChange={this.changePassword1Handler} />
                            </div>
                            <div className="form-group">
                                <label>Şifreyi Tekrarla:</label>
                                <input placeholder="******" name="username" className="form-control"
                                value={this.state.password2} onChange={this.changePassword2Handler} />
                            </div>
                            <div className="form-group">
                                <label>Rol:</label>
                                <select className="form-control"  value={this.state.role} onChange={this.changeRoleHandler}>
                                {this.state.allRoles.map((option) => (
                                    <option value={option.id}> {option.id} - {option.name}</option>
                                ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Aktiflik:</label>
                                <input type="checkbox" name="enabled" checked={this.state.enabled} onChange={this.changeEnabledHandler} style={{marginLeft:"10px"}}/>
                            </div>
                            
                            <button className="btn btn-success" onClick={this.saveUser.bind(this)}>{this.getButtonText()}</button>
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

export default CreateUserComponent;