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

import RoleService from "../../services/RoleService";
import DeleteModal from "../util/modal/DeleteModal";

const { SearchBar } = Search;

class ListRoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      columns: [
        {
          dataField: "name",
          text: "İSİM",
          title: true,
          sort: true,
        },
        {
          dataField: "definition",
          text: "AÇIKLAMA",
          sort: true,
          title: true,
        },
        {
          dataField: "df",
          isDummyField: true,
          title: true,
          headerStyle: () => {
            return { width: "40%" };
          },
          align: "center",
          text: "İŞLEMLER",
          formatter: (cellContent, row) => {
            let rowId = row.id;
            return (
              <div>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.viewRole(rowId)}
                  className="btn btn-success"
                >
                  Görüntüle
                </button>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.updateRole(rowId)}
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

    this.addRole = this.addRole.bind(this);
    this.viewRole = this.viewRole.bind(this);
    this.updateRole = this.updateRole.bind(this);
  }

  componentDidMount() {
    RoleService.getAllRoles()
      .then((res) => {
        this.setState({ roles: res.data });
      })
      .catch((ex) => {
        console.error(ex);
        const notify = () => toast("Sunucu ile iletişime geçilemedi. Hata Kodu: LST-ROL-01");
        notify();
      });
  }

  addRole() {
    this.props.history.push("/add-role/add/_add");
  }

  updateRole(id) {
    this.props.history.push(`/add-role/update/${id}`);
  }

  viewRole(id) {
    this.props.history.push(`/add-role/view/${id}`);
  }

  delete = (row) => {
    RoleService.deleteRole(row.id)
      .then((res) => {
        RoleService.getAllRoles()
          .then((res) => {
            this.setState({ roles: res.data });
          })
          .catch((ex) => {
            const notify = () => toast("Sunucu ile iletişime geçilemedi. Hata Kodu: LST-ROL-02");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Rol silinemedi. Hata Kodu: LST-ROL-03");
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
          value: this.state.roles.length,
        },
      ], // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
      <div className="container">
          <ToastContainer />
        <div className="col-sm-12 btn btn-info">Rol Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.roles}
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
                  onClick={this.addRole}
                >
                  Rol Ekle
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

export default ListRoleComponent;
