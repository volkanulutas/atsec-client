import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import TissueTypeService from '../../services/TissueTypeService';

const { SearchBar } = Search;

class ListTissueTypeComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            tissueTypes :[],
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
                    dataField: 'definition',
                    text: 'AÇIKLAMA',
                    sort: true,
                    title: true,
                },
                {
                    dataField: 'df',
                    isDummyField: true,
                    title: true,
                    align: 'center',
                    text: 'İŞLEMLER',
                    formatter: (cellContent, row) => {
                       let rowId = row.id;
                    return (
                        <div>
                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewTissue(rowId)} className="btn btn-success">Görüntüle</button> 
                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateTissue(rowId)} className="btn btn-info">Güncelle</button> 
                            <button type="button" onClick={() => this.handleShowModal(rowId)} className="btn btn-danger">Sil</button>            
                        </div>
                    );
                    }
                },
            ]
        }
        this.addTissue = this.addTissue.bind(this);
        this.updateTissue = this.updateTissue.bind(this);
        this.viewTissue = this.viewTissue.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    componentDidMount(){
        TissueTypeService.getAllTissueTypes().then((res) => {
            this.setState({tissueTypes : res.data});
        });
    }

    handleShowModal(rowId) {
        this.setState({ selectedRowId: rowId });
        this.setState({ showDeleteModal: true });
    }

    handleHideModal() {
        this.setState({ showDeleteModal: false });
    }

    addTissue(){
        this.props.history.push('/add-tissuetype/_add');
    }

    viewTissue(id){
        this.props.history.push(`/view-tissuetype/${id}`);
    }

    updateTissue(id){
        this.props.history.push(`/add-tissue/${id}`);
    }

    deleteTissue(){

        this.setState({ showDeleteModal: false });

        <TissueTypeService className="deleteTissueType"></TissueTypeService>(this.state.selectedRowId).then(res => {
            TissueTypeService.getAllTissueTypes().then((res) => {
                this.setState({tissueTypes : res.data});
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
              text: 'Tümü', value: this.state.tissueTypes.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };
          
        return (
            <div className="container">
               <div class="col-sm-12 btn btn-info">Doku Tipi Listesi</div> 
                <div>
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.tissueTypes }
                    columns={ this.state.columns }
                    bootstrap4 = "true"
                    search
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps }
                        placeholder="Arama" />
                        <button type="button" className="btn btn-primary addButton" onClick={this.addTissue}>Doku Tipi Ekle</button>
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
                        <button className="btn btn-success" onClick={() => this.deleteTissue()}>Sil</button>
                    </ModalFooter>
                </Modal>     
            </div>
            )
        }
}

export default ListTissueTypeComponent;