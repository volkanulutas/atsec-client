import React, { Component, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PackingProductService from "../../services/PackingProductService";
import DeleteModal from "../util/modal/DeleteModal";
import PackingProductProcessingModal from "../packingproduct/modal/PackingProductProcessingModal";
import PackingProductBarcodeModal from "../packingproduct/modal/PackingProductBarcodeModal";

const { SearchBar } = Search;

class ListPackingProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      products: [],

      selectedRowId: "",
      columns: [
        {
          dataField: "id",
          text: "Id",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "donor.code",
          text: "Donör Id",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "partitionId",
          text: "Bölünme Id",
          align: "center",
          sort: true,
          title: true,
          formatter: (cell, row) => {
            let styleVar = "btn btn-secondary";
            if (cell === "Paketleme") {
              styleVar = "btn btn-danger";
            }
            return <div className={styleVar}>{cell}</div>;
          },
        },
        {
          dataField: "packingProductCode",
          text: "Paketlenen Ürün Kodu",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "lot",
          text: "lot",
          sort: true,
          title: true,
        },
        {
          dataField: "size",
          text: "Boyut",
          align: "center",
          sort: true,
          title: true,
          formatter: (cell, row) => {
            let styleVar = "btn btn-secondary";
            if (cell === "Paketleme") {
              styleVar = "btn btn-danger";
            }
            return <div className={styleVar}>{cell}</div>;
          },
        },
        {
          dataField: "date",
          text: "Gama Tarihi",
          align: "center",
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
          formatter: (cellContent, rowParam) => {
            let row = rowParam;
            return (
              <div>
                <div>
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    onClick={() => this.viewProduct(row)}
                    className="btn btn-success"
                  >
                    Görüntüle
                  </button>
                </div>

                {this.checkstatus(row)}
              </div>
            );
          },
        },
      ],
    };

    this.updateProduct = this.updateProduct.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
  }

  viewProduct(row) {
    this.props.history.push(`/add-packingproduct/view/${row.id}`);
  }

  updateProduct(row) {
    this.props.history.push(`/add-packingproduct/update/${row.id}`);
  }

  componentDidMount() {
    PackingProductService.getAll()
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((ex) => {
        const notify = () =>
          toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-PAC-01");
        notify();
      });
  }

  checkstatus(row) {
    if (row.status === "Paketleme") {
      return (
        <div>
          <PackingProductProcessingModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            row={row}
            callback_accept={this.performPreprocessing_accept}
            callback_reject={this.performPreprocessing_reject}
          />
        </div>
      );
    } else if (row.status === "Paketleme Etiket") {
      <div>
        <PackingProductBarcodeModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          row={row}
          callback_accept={this.performBarcode_accept}
          callback_reject={this.performBarcode_reject}
        />
      </div>;
    }
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
          value: this.state.products.length,
        },
      ],
    };
    return (
      <div className="container">
        <ToastContainer />
        <div className="col-sm-12 btn btn-info">Paketlenmiş Ürün Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.products}
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
                  onClick={this.addProduct}
                >
                  Ürün Ekle
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

export default ListPackingProductComponent;
