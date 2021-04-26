import React, { Component, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import ProductService from "../../services/ProductService";
import DeleteModal from "../util/modal/DeleteModal";
import ProductPreprocessingModal from "./modal/ProductPreprocessingModal";
import ProductFreezingModalAfterCourse from "./modal/ProductFreezingModalAfterCourse";
import ProductFreezingModalAfterDelipidation from "./modal/ProductFreezingModalAfterDelipidation";
import ProductFreezingModal from "./modal/ProductFreezingModal";
import AuthService from "../../services/AuthService";

const { SearchBar } = Search;

class ListProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      products: [],

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
          dataField: "definition",
          text: "Açıklama",
          sort: true,
          title: true,
        },
        {
          dataField: "secCode",
          text: "SEC Kodu",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "customer.identityNumber",
          text: "Müşteri ID",
          align: "center",
          sort: true,
          title: true,
        },
        {
          dataField: "status",
          text: "DURUM",
          align: "center",
          sort: true,
          title: true,
          formatter: (cell, row) => {
            let styleVar = "btn btn-secondary";
            if (cell === "Ön İşlem") {
              styleVar = "btn btn-danger";
            } else if (cell === "Dondurma (Pre)") {
              styleVar = "btn btn-warning";
            } else if (cell === "Yıkama") {
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
                    onClick={() => this.viewProduct(row)}
                    className="btn btn-success"
                  >
                    Görüntüle
                  </button>
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    onClick={() => this.updateProduct(row)}
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
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
  }

  componentDidMount() {
    // TODO: 
    // uthService.checkSession();

    ProductService.getAllProducts()
      .then((res) => {
        console.log(res.data);
        this.setState({ products: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  checkstatus(row) {
    if (row.status === "Ön İşlem") {
      return (
        // (Ön İşlem) => (Ön İşlem - Kabul)
        <div>
          <ProductPreprocessingModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performPreProcessingState_accept}
            callback_reject={this.performPreProcessingState_reject}
          />
          <button
            type="button"
            style={{ marginRight: "5px" }}
            // onClick={() => this.viewProduct(row)}
            className="btn btn-success"
          >
            Etiket Oluştur
          </button>
        </div>
      );
    } else if (row.status === "Ön İşlem - Kabul") {
      return (
        // (Ön İşlem - Kabul) => (Dondurma (Pre))
        <div>
          <ProductFreezingModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performFreezingState_accept}
            callback_reject={this.performFreezingState_reject}
          />
          <button
            type="button"
            style={{ marginRight: "5px" }}
            // onClick={() => this.viewProduct(row)}
            className="btn btn-success"
          >
            Etiket Oluştur
          </button>
        </div>
      );
    } else if (row.status === "Dondurma (Pre)") {
      return (
        // Kaba Öğütme => Dondurma (Course)
        <div>
          <ProductFreezingModalAfterCourse
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performCourseGrinding_accept}
            callback_reject={this.performCourseGrinding_reject}
          />
        </div>
      );
    } else if (row.statuss === "Kaba Öğütme") {
      return <div></div>;
    } else if (row.status === "Dondurma (Course)") {
      return (
        <button
          type="button"
          style={{ marginRight: "5px" }}
          onClick={() => this.performFineGrilling(row)}
          className="btn btn-success"
        >
          İnce Öğütme (Fine)
        </button>
      );
    } else if (row.status === "İnce Öğütme") {
      return (
        <ProductFreezingModalAfterDelipidation
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_accept={this.performFreezingAfterDelipidation_accept}
          callback_reject={this.performCourseGrinding_reject}
        />
      );
    }
  }

  performFreezingState_accept(row, data) {
    // location change, state change
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;
        product.location = data;
        product.status = "Dondurma (Pre)";

        ProductService.updateProduct(row.id, product)
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
  performFineGrilling(row) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "İnce Öğütme";

        ProductService.updateProduct(row.id, product)
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

  performFreezingAfterDelipidation_accept(row) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Sterilizasyon";

        ProductService.updateProduct(row.id, product)
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

  performFreezingAfterDelipidation_reject(row) {}

  performCourseGrinding_reject(row) {}

  performCourseGrinding_accept(row) {
    // course grinding -> Dondurma (Course)

    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Dondurma (Course)";

        ProductService.updateProduct(row.id, product)
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

  performFreezingState_reject(row, data) {}

  performPreProcessingState_accept(row, data) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Ön İşlem - Kabul";

        var preProcessingList = ["Kesme", "Yıkama", "Kartilaj Alma"];
        product.performPreProcessingType = preProcessingList;

        ProductService.updateProduct(row.id, product)
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

  performPreProcessingState_reject(row, data) {}

  addProduct() {
    this.props.history.push("/add-product/add/_add");
  }

  viewProduct(row) {
    this.props.history.push(`/add-product/view/${row.id}`);
  }

  updateProduct(row) {
    this.props.history.push(`/add-product/update/${row.id}`);
  }

  deleteProduct(id) {
    ProductService.deleteProduct(id)
      .then((res) => {
        ProductService.getAllProducts().then((res) => {
          this.setState({ products: res.data });
        });
      })
      .catch((ex) => {
        console.error(ex);
      })
      .catch((ex) => {
        console.error(ex);
      });
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
        <div className="col-sm-12 btn btn-info">Ürün Listesi</div>
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

export default ListProductComponent;
