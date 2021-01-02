import React, { Component } from 'react';

import PermissionService from '../../services/PermissionService';

class ViewPermissionComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            definition: '',
            deleted: false,
        }
        this.back = this.back.bind(this);
    } 

    back = (event) => {
        this.props.history.push('/permissions');
    }

    componentDidMount(){
            PermissionService.getPermissionById(this.state.id)
            .then(res => {
                let permission = res.data;
                this.setState({
                    name: permission.name,
                    definition: permission.definition,
                });
                console.log('permission: ' + JSON.stringify(permission));
            }).catch(ex => {
                console.error(ex);
            });
    }

    render() {
        return (
            <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"> 
                        <h3 className="text-center">Yetki Detayı</h3>
                        <div className="card-body"> 
                        <form>
                            <div className="form-group">
                                <label>İsim:</label>
                                <input placeholder="Yetki İsmi" name="name" className="form-control"
                                value={this.state.name} disabled />
                            </div>

                            <div className="form-group">
                                <label>Açıklama:</label>
                                <input placeholder="Açıklama" name="definition" className="form-control"
                                value={this.state.definition} disabled />
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

export default ViewPermissionComponent;