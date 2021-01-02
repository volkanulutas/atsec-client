import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import UserService from '../../services/UserService';

const { SearchBar } = Search;

class ListUserComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            users :[],
            showDeleteModal: false,
            selectedRowId: '',
            columns: [
                {
                    dataField: 'name',
                    text: 'İSİM',
                    title: true,
                    sort: true, 
                },
                {
                    dataField: 'surname',
                    text: 'SOYİSİM',
                    sort: true,
                },
                {
                    dataField: 'username',
                    text: 'E-POSTA',
                    sort: true,
                },
                {
                    dataField: 'df',
                    isDummyField: true,
                    align: 'center',
                    text: 'İşlemler',
                    formatter: (cellContent, row) => {
                       let rowId = row.id;
                    return (
                        <div>
                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewUser(rowId)} className="btn btn-success">Görüntüle</button> 
                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateUser(rowId)} className="btn btn-info">Güncelle</button> 
                            <button type="button" onClick={() => this.handleShowModal(rowId)} className="btn btn-danger">Sil</button>            
                        </div>
                    );
                    }
                },
            ]
        }
        this.addUser = this.addUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    componentDidMount(){
        UserService.getAllUsers().then(res=> {
            this.setState({users : res.data});
        }).catch(ex => {
            console.error(ex);
        });
    }

    handleShowModal(rowId) {
        this.setState({ selectedRowId: rowId });
        this.setState({ showDeleteModal: true });
    }

    handleHideModal() {
        this.setState({ showDeleteModal: false });
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
            }).catch(ex => {
                console.error(ex);
            });
        }).catch(ex => {
            console.error(ex);
        });
    }

    render() {
        const defaultSorted = [{
            dataField: 'name',
            order: 'asc'
          }];

          const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
             { from } - { to } arası gösteriliyor. Toplam Kayıt Sayısı: { size }
            </span>
          );
          
          const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            //alwaysShowAllBtns: true, // Always show next and previous button
            //withFirstAndLast: false, // Hide the going to First and Last page button
            //hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'İlk',
            prePageText: 'Önceki',
            nextPageText: 'Sonraki',
            lastPageText: 'Son',
            nextPageTitle: 'İlk Sayfa',
            prePageTitle: 'Pre page',
            firstPageTitle: 'İlk Sayfa',
            lastPageTitle: 'Son Sayfa',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
                text: '25', value: 25
            }, 
            {
              text: 'Tümü', value: this.state.users.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };
          
        return (
            <div className="container">
               <div class="col-sm-12 btn btn-info">Kullanıcı Listesi</div> 
                <div>
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.users }
                    columns={ this.state.columns }
                    bootstrap4 = "true"
                    search
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps }
                        placeholder="Arama" />
                        <button type="button" className="btn btn-primary addButton" onClick={this.addUser}>Kullanıcı Ekle</button>
                        <hr />
                        <BootstrapTable
                        { ...props.baseProps }
                        striped hover 
                        filter={filterFactory()} 
                        pagination={ paginationFactory(options) }
                        defaultSorted={ defaultSorted } 
                        noDataIndication="Veri bulunamadı."
                        />
                    </div>
                    )
                }
                </ToolkitProvider>
                </div>   

                <Modal isOpen={this.state.showDeleteModal} toggle={this.handleShowModal}>
                    <ModalHeader toggle={this.handleShowModal}>Sil</ModalHeader>
                    <ModalBody>
                    <p>Silme İşlemini Onayla?</p>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={this.handleHideModal}>İptal</button>{' '}
                        <button className="btn btn-success" onClick={() => this.deleteUser()}>Sil</button>
                    </ModalFooter>
                </Modal>     
            </div>
            )
        }
}

export default ListUserComponent;