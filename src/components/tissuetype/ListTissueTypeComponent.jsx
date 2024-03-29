import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeleteModal from "../util/modal/DeleteModal";
import TissueTypeService from "../../services/TissueTypeService";

const { SearchBar } = Search;

class ListTissueTypeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tissueTypes: [],
      columns: [
        {
          dataField: "name",
          text: "İSİM",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "definition",
          text: "AÇIKLAMA",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "df",
          isDummyField: true,
          title: true,
          align: "center",
          text: "İŞLEMLER",
          formatter: (cellContent, row) => {
            let rowId = row.id;
            return (
              <div>
                <button
                  type="button"
                  style={{ marginRight: "10px" }}
                  onClick={() => this.view(rowId)}
                  className="btn btn-success"
                >
                  Görüntüle
                </button>
                <button
                  type="button"
                  style={{ marginRight: "10px" }}
                  onClick={() => this.update(rowId)}
                  className="btn btn-info"
                >
                  Güncelle
                </button>
                <DeleteModal
                  style={{ marginRight: "5px" }}
                  initialModalState={false}
                  data={row}
                  callback={this.delete}
                />
              </div>
            );
          },
        },
      ],
    };
    this.add = this.add.bind(this);
    this.view = this.view.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    TissueTypeService.getAllTissueTypes().then((res) => {
      this.setState({ tissueTypes: res.data });
    });
  }

  add() {
    this.props.history.push("/add-tissuetype/add/_add");
  }

  view(id) {
    this.props.history.push(`/add-tissuetype/view/${id}`);
  }

  update(id) {
    this.props.history.push(`/add-tissue/update/${id}`);
  }

  delete = (row) => {
    TissueTypeService.deleteTissueType(row.id)
      .then((res) => {
        TissueTypeService.getAllTissueTypes()
          .then((res) => {
            this.setState({ tissueTypes: res.data });
          })
          .catch((ex) => {
            const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-TIS-TYP-01");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Doku Tipi silinemedi. Hata Kodu: LST-TIS-TYP-02");
        notify();
      });
  };

  render() {
    const defaultSorted = [
      {
        dataField: "name",
        order: "asc",
      },
    ];

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        {from} - {to} arası gösteriliyor. Toplam Kayıt Sayısı: {size}
      </span>
    );

    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: "İlk",
      prePageText: "Önceki",
      nextPageText: "Sonraki",
      lastPageText: "Son",
      nextPageTitle: "İlk Sayfa",
      prePageTitle: "Pre page",
      firstPageTitle: "İlk Sayfa",
      lastPageTitle: "Son Sayfa",
      showTotal: true,
      paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [
        {
          text: "5",
          value: 5,
        },
        {
          text: "10",
          value: 10,
        },
        {
          text: "25",
          value: 25,
        },
        {
          text: "Tümü",
          value: this.state.tissueTypes.length,
        },
      ],
    };

    return (
      <div className="container">
          <ToastContainer />
        <div className="col-sm-12 btn btn-info">Doku Tipi Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.tissueTypes}
            columns={this.state.columns}
            bootstrap4="true"
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} placeholder="Arama" />
                <button
                  type="button"
                  className="btn btn-primary addButton"
                  onClick={this.add}
                >
                  Doku Tipi Ekle
                </button>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  hover
                  filter={filterFactory()}
                  pagination={paginationFactory(options)}
                  defaultSorted={defaultSorted}
                  noDataIndication="Veri bulunamadı."
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

export default ListTissueTypeComponent;
