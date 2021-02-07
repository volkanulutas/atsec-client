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
import DonorInstituteService from "../../services/DonorInstituteService";

const { SearchBar } = Search;

class ListDonorInstituteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donorInstitutes: [],
      columns: [
        {
          dataField: "code",
          text: "KURUM KODU",
          title: true,
          align: "center",
          sort: true,
        },
        {
          dataField: "name",
          text: "KURUM ADI",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "df",
          isDummyField: true,
          title: true,
          align: "center",
          headerStyle: () => {
            return { width: "30%" };
          },
          text: "İŞLEMLER",
          formatter: (cellContent, row) => {
            let rowId = row.id;
            return (
              <div>
                <button
                  type="button"
                  style={{ marginRight: "10px" }}
                  onClick={() => this.viewDonorInstitute(rowId)}
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
    DonorInstituteService.getAllDonorInstitutes()
      .then((res) => {
        this.setState({ donorInstitutes: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  add() {
    this.props.history.push("/add-donorinstitute/_add");
  }

  update(id) {
    this.props.history.push(`/add-donorinstitute/${id}`);
  }

  view(id) {
    this.props.history.push(`/view-donorinstitute/${id}`);
  }

  delete = (row) => {
    DonorInstituteService.deleteDonorInstitute(row.id)
      .then((res) => {
        DonorInstituteService.getAllDonorInstitutes()
          .then((res) => {
            this.setState({ donorInstitutes: res.data });
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
          value: this.state.donorInstitutes.length,
        },
      ],
    };

    return (
      <div className="container">
        <div className="col-sm-12 btn btn-info">Donör Kurum Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.donorInstitutes}
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
                  Kurum Ekle
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

export default ListDonorInstituteComponent;
