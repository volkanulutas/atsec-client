import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import LocationService from '../../services/LocationService';

const { SearchBar } = Search;

class ListLocationComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            locations :[],
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
                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.viewLocation(rowId)} className="btn btn-success">Görüntüle</button> 
                            <button type="button" style={{marginRight:"10px"}} onClick={() => this.updateLocation(rowId)} className="btn btn-info">Güncelle</button> 
                            <button type="button" onClick={() => this.handleShowModal(rowId)} className="btn btn-danger">Sil</button>            
                        </div>
                    );
                    }
                },
            ]
        }
        this.addLocation = this.addLocation.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.viewLocation = this.viewLocation.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    componentDidMount(){
        LocationService.getAllLocations().then((res) => {
            this.setState({locations : res.data});
        });
    }

    handleShowModal(rowId) {
        this.setState({ selectedRowId: rowId });
        this.setState({ showDeleteModal: true });
    }

    handleHideModal() {
        this.setState({ showDeleteModal: false });
    }

    addLocation(){
        this.props.history.push('/add-location/_add');
    }

    viewLocation(id){
        this.props.history.push(`/view-location/${id}`);
    }

    updateLocation(id){
        this.props.history.push(`/add-location/${id}`);
    }

    deleteLocation(){

        this.setState({ showDeleteModal: false });

        LocationService.deleteLocation(this.state.selectedRowId).then(res => {
            LocationService.getAllLocations().then((res) => {
                this.setState({locations : res.data});
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
              text: 'Tümü', value: this.state.locations.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };
          
        return (
            <div className="container">
               <div class="col-sm-12 btn btn-info">Lokasyon Listesi</div> 
                <div>
                <ToolkitProvider
                    keyField="id"
                    data={ this.state.locations }
                    columns={ this.state.columns }
                    bootstrap4 = "true"
                    search
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps }
                        placeholder="Arama" />
                        <button type="button" className="btn btn-primary addButton" onClick={this.addLocation}>Lokasyon Ekle</button>
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
                        <button className="btn btn-success" onClick={() => this.deleteLocation()}>Sil</button>
                    </ModalFooter>
                </Modal>     
            </div>
            )
        }
}

export default ListLocationComponent;