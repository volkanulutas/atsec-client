import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import RawProductService from "../../../services/RawProductService";

const { SearchBar } = Search;

class ListRejectArchiveComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rejectArchives: [],
      columns: [
        {
          dataField: "donor.code",
          text: "DONOR ID",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "tissueType.name",
          text: "DOKU TİPİ",
          sort: true,
          title: true,
        },
        {
          dataField: "location.name",
          text: "LOKASYON",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "statusName",
          text: "DURUM",
          align: "center",
          sort: true,
          title: true,
          formatter: (cell, row) => {
            let styleVar = "btn btn-secondary";
            return <div className={styleVar}>{cell}</div>;
          },
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
          formatter: (cellContent, rowParam) => {
            let row = rowParam;
            return (
              <div>
                <button
                  type="button"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.view(row)}
                  className="btn btn-success"
                >
                  Görüntüle
                </button>
              </div>
            );
          },
        },
      ],
    };

    this.view = this.view.bind(this);
  }

  componentDidMount() {
    RawProductService.getRejectArchivesRawProducts().then((res) => {
      this.setState({ rejectArchives: res.data });
    });
  }

  view(id) {
    this.props.history.push(`/view-rejectarchive/${id}`);
  }

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
          value: this.state.rejectArchives.length,
        },
      ],
    };

    return (
      <div className="container">
        <div className="col-sm-12 btn btn-info">Ham Ürün Red Arşivi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.rejectArchives}
            columns={this.state.columns}
            bootstrap4="true"
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} placeholder="Arama" />
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

export default ListRejectArchiveComponent;
