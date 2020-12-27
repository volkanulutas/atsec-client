import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

class ChangePasswordComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            username: '',
            password: '',
            password2: '',
        }
        this.changePassword = this.changePassword.bind(this);
    } 

    componentDidMount(){
        console.log(this.state.id);
        console.log(this.state.id);
    }

    changePassword = (event) => {
        let changePassword = {token: this.state.id, password: this.state.password};

        AuthService.changePassword(changePassword).then(res => {
            console.log(res.data);
        }).catch(ex => {
            console.error(ex);
        });
    
    }

    changePasswordHandler = (event) => {
        this.setState({password:event.target.value});
    }

    changePassword2Handler = (event) => {
        this.setState({password2:event.target.value});
    }

    cancel = (event) => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Şifre Değiştir</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>Şifre:</label>
                                <input placeholder="Şifre" name="name" className="form-control"
                                value={this.state.password} onChange={this.changePasswordHandler} />
                            </div>

                            <div className="form-group">
                                <label>Şifrenizi Tekrar Giriniz:</label>
                                <input placeholder="Şifrenizi Tekrar Giriniz:" name="definition" className="form-control"
                                value={this.state.password2} onChange={this.changePassword2Handler} />
                            </div>

                            <button className="btn btn-success" onClick={this.changePassword.bind(this)}>Kaydet</button>
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

export default ChangePasswordComponent;