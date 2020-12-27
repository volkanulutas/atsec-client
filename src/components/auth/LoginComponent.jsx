import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import AuthService from '../../services/AuthService';

class LoginComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            showForgetPassword: false,
            model: false,
        }
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.sendForgetPassword = this.sendForgetPassword.bind(this);
        this.login =  this.login.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    } 

    handleShowModal() {
        this.setState({ showForgetPassword: true });
    }

    handleHideModal() {
        this.setState({ showForgetPassword: false });
    }

    sendForgetPassword() {
        this.setState({ showForgetPassword: false });

        let userRequest = {username: this.state.username};
        AuthService.forgetPassword(userRequest).then(res => {
            console.log(res.data);
        }).catch(ex => {
            console.error(ex);
        });
    }

    login() {
        let loginRequest = {username: this.state.username, password: this.state.password};
        this.props.history.push('/home');
        AuthService.login(loginRequest).then(res => {
            this.props.history.push('/home');
        }).catch(ex => {
            this.props.history.push('/home');
        });
    }

    changeUsernameHandler = (event) => {
        this.setState({username:event.target.value});   
    }

    changePasswordHandler = (event) => {
        this.setState({password:event.target.value});   
    }

    render() {
        return (
            <div>
              <div className="container-fluid"> 
                <div className="row ">
                  
           <div className="col-sm-6 bg-dark text-white">
               <div className="row pt-5">
                   <div className="col-md-8 col-sm-10 offset-sm-1 offset-md-2">
       

                        <div className="text-center">
                      <div>
                      <img src="/images/login/bio2.svg" width="50px" height="50px"  className="img-fluid" alt=""></img>
                       
                        <h4>ATSEC</h4>
                           
                        </div>
                       
                         <p>SEC Kodu Üretim ve Süreç Yönetimi</p>

                       </div>
               
                      <div className="login ">
                       <form action="" className="pt-3">
                           <input type="email" name="" id="" className="form-control" 
                           value={this.state.username} onChange={this.changeUsernameHandler}
                           required placeholder="E-posta"/>
                           <input type="password" name="" id="" className="form-control"
                           value={this.state.password} onChange={this.changePasswordHandler}
                           required placeholder="Şifre"/>
                           <button className="btn btn-success btn-block" onClick={this.login}>Giriş</button>
                      </form>


                
                            <Button color="primary" onClick={this.handleShowModal}>Şifremi Unuttum</Button>
                            <Modal isOpen={this.state.showForgetPassword} toggle={this.handleShowModal}>
                                <ModalHeader toggle={this.handleShowModal}>Şifremi Unuttum</ModalHeader>
                                <ModalBody>
                                <input type="email" name="" id="username" className="form-control"
                                value={this.state.username} onChange={this.changeUsernameHandler}
                                required placeholder="E-posta"/>
                                </ModalBody>
                                <ModalFooter>
                                    <button className="btn btn-danger" onClick={this.handleHideModal}>İptal</button>{' '}
                                    <button className="btn btn-success" onClick={this.sendForgetPassword}>Gönder</button>
                             </ModalFooter>
                            </Modal>
                    
                  
                      </div>
                   </div>
               </div>
           </div>
           <div className="col-sm-6 bg">
               <div className="text-center"> 
               </div>
          </div>

           
            </div>
        </div>

        </div>
        );
    }
} 

export default LoginComponent;