import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import UserService from "../../services/UserService";
import DeleteModal from "../util/modal/DeleteModal";
import PermissionManager from "../manager/PermisssionManager";

const { SearchBar } = Search;

class ListUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      permissionDelete: true,
      columns: [
        {
          dataField: "name",
          text: "İSİM",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "surname",
          text: "SOYİSİM",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "username",
          text: "E-POSTA",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "df",
          isDummyField: true,
          align: "center",
          text: "İşlemler",
          title: true,
          headerStyle: () => {
            return { width: "40%" };
          },
          formatter: (cellContent, row) => {
            let rowId = row.id;
            return (
              <div>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.view(rowId)}
                  className="btn btn-success"
                >
                  Görüntüle
                </button>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.update(rowId)}
                  className="btn btn-info"
                >
                  Güncelle
                </button>
                <DeleteModal
                  permissionDelete={this.state.permissionDelete}
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
    let userListDeletePer = PermissionManager.checkPermission("USER_PAGE_PERMISSION", "list-user-delete");
    this.setState({ permissionDelete: userListDeletePer });
   
    UserService.getAllUsers()
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  add() {
    this.props.history.push("/add-user/add/_add");
  }

  view(id) {
    this.props.history.push(`/add-user/view/${id}`);
  }

  update(id) {
    this.props.history.push(`/add-user/update/${id}`);
  }

  delete = (row) => {
    UserService.deleteUser(row.id)
      .then((res) => {
        UserService.getAllUsers()
          .then((res) => {
            this.setState({ users: res.data });
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
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
          value: this.state.users.length,
        },
      ],
    };

    return (
      <div className="container">
        <div className="col-sm-12 btn btn-info">Kullanıcı Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.users}
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
                  Kullanıcı Ekle
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

export default ListUserComponent;
