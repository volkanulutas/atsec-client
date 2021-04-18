import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import DeleteModal from "../util/modal/DeleteModal";
import PermissionService from "../../services/PermissionService";

const { SearchBar } = Search;

class ListPermissionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: [],
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
          headerStyle: () => {
            return { width: "40%" };
          },
          title: true,
          align: "center",
          text: "İŞLEMLER",
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
    PermissionService.getAllPermissions().then((res) => {
      this.setState({ permissions: res.data });
    });
  }

  add() {
    this.props.history.push("/add-permission/add/_add");
  }

  view(id) {
    this.props.history.push(`/add-permission/view/${id}`);
  }

  update(id) {
    this.props.history.push(`/add-permission/update/${id}`);
  }

  delete = (row) => {
    PermissionService.deletePermission(row.id)
      .then((res) => {
        PermissionService.getAllPermissions()
          .then((res) => {
            this.setState({ permissions: res.data });
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
          value: this.state.permissions.length,
        },
      ], // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
      <div className="container">
        <div className="col-sm-12 btn btn-info">Yetki Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.permissions}
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
                  Yetki Ekle
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

export default ListPermissionComponent;
