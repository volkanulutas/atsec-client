import React, { Component, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import RawProductService from "../../services/RawProductService";
import DeleteModal from "../util/modal/DeleteModal";
import PerformQuarantinaModal from "../util/modal/PerformQuarantinaModal";
import PerformAcceptModal from "../util/modal/PerformAcceptModal";
import PerformRejectModal from "../util/modal/PerformRejectModal";

// PDF Viewer
import { Document, Page, pdfjs } from "react-pdf";
// import PDF from "../rawproduct/file.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { SearchBar } = Search;

class ListRawProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      products: [],
      pdfFile: null,

      selectedRowId: "",
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
            if (cell === "Red") {
              styleVar = "btn btn-danger";
            } else if (cell === "Karantina") {
              styleVar = "btn btn-warning";
            } else if (cell === "Kabul") {
              styleVar = "btn btn-success";
            }
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
                <div>
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    onClick={() => this.viewRawProduct(row)}
                    className="btn btn-success"
                  >
                    Görüntüle
                  </button>
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    onClick={() => this.updateRawProduct(row)}
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

                {this.checkstatus(row)}
              </div>
            );
          },
        },
      ],
    };
    this.addRawProduct = this.addRawProduct.bind(this);
    this.updateRawProduct = this.updateRawProduct.bind(this);
    this.viewRawProduct = this.viewRawProduct.bind(this);
    this.testBarcode = this.testBarcode.bind(this);
    this.viewBarcode = this.viewBarcode.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess({ numPages }) {
    this.state.numPages = numPages;
  }

  checkstatus(row) {
    if (row.statusName === "Karantina") {
      return (
        <PerformQuarantinaModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_accept={this.performQuarantina_accept}
          callback_reject={this.performQuarantina_reject}
        />
      );
    } else if (row.statusName === "Kabul") {
      return (
        <PerformAcceptModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_preProcessing={this.performAccept_preProcessing}
          callback_accept={this.performAccept_accept}
        />
      );
    } else if (row.statusName === "Red") {
      return (
        <PerformRejectModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_accept={this.performReject_accept}
          callback_reject={this.performReject_reject}
        />
      );
    }
  }

  componentDidMount() {
    this.setState({ pdfFile: RawProductService.getRawProductBarcode() });

    RawProductService.getAllRawProducts()
      .then((res) => {
        console.log(res.data);
        this.setState({ products: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  // called by modal, callback. Qurantina to Reject
  performQuarantina_reject = (row, quarantina_data) => {
    // location change, state change
    RawProductService.getRawProductById(row.id)
      .then((res) => {
        let rawProduct = res.data;
        rawProduct.location = quarantina_data;
        rawProduct.statusName = "Red";

        RawProductService.updateRawProduct(row.id, rawProduct)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  // called by modal, callback. Quarantina to Accept.
  performQuarantina_accept = (row, quarantina_data) => {
    // location change, state change
    RawProductService.getRawProductById(row.id)
      .then((res) => {
        let rawProduct = res.data;
        rawProduct.location = quarantina_data;
        rawProduct.statusName = "Kabul";

        RawProductService.updateRawProduct(row.id, rawProduct)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  performReject_accept(row, data) {
    RawProductService.getRawProductById(row.id)
      .then((res) => {
        let rawProduct = res.data;
        // TODO: location i ne olacak.
        rawProduct.statusName = "Tibbi Atık";

        RawProductService.updateRawProduct(row.id, rawProduct)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
    this.props.history.push("/rawproducts");
  }

  performReject_reject(row, data) {}

  performReject_accept(row, data) {
    RawProductService.getRawProductById(row.id)
      .then((res) => {
        let rawProduct = res.data;
        // TODO: location i ne olacak.
        rawProduct.statusName = "Tibbi Atık";

        RawProductService.updateRawProduct(row.id, rawProduct)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  performAccept_accept(row, data) {
    RawProductService.getRawProductById(row.id)
      .then((res) => {
        let rawProduct = res.data;
        rawProduct.location = data;
        // TODO: ek dokumanlar
        rawProduct.statusName = "Red";

        RawProductService.updateRawProduct(row.id, rawProduct)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  performAccept_preProcessing(row) {
    // TODO: product sayfası için işlemleri yap... Product olarak üretilecektir.
    RawProductService.getRawProductById(row.id)
      .then((res) => {
        let rawProduct = res.data;
        rawProduct.statusName = "Ön İşlem";

        RawProductService.updateRawProduct(row.id, rawProduct)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });

    this.props.history.push("/rawproducts");
  }

  // called by modal, callback.
  delete = (row) => {
    let id = row.id;
    RawProductService.deleteRawProduct(id)
      .then((res) => {
        RawProductService.getAllRawProducts()
          .then((res) => {
            this.setState({ products: res.data });
          })
          .catch((ex) => {
            console.error(ex);
          });
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  viewBarcode() {
    RawProductService.downloadRawProductBarcode();
  }
  testBarcode() {
    // RawProductService.getRawProductBarcode();
  }
  addRawProduct() {
    this.props.history.push("/add-rawproduct/add/_add");
  }

  viewRawProduct(row) {
    this.props.history.push(`/add-rawproduct/view/${row.id}`);
  }

  updateRawProduct(row) {
    this.props.history.push(`/add-rawproduct/update/${row.id}`);
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
        <Document file={this.state.pdfFile}>
          <Page pageNumber={1} />
        </Document>
        <div className="col-sm-12 btn btn-info">Ham Ürün Listesi</div>
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
                  onClick={this.addRawProduct}
                >
                  Ham Ürün Ekle
                </button>

                <button
                  type="button"
                  className="btn btn-primary addButton"
                  onClick={this.viewBarcode}
                >
                  Barcode test
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

export default ListRawProductComponent;
