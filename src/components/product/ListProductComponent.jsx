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

import ProductCoarseModal from "./modal/ProductCoarseModal";
import ProductPreprocessingModal from "./modal/ProductPreprocessingModal";
import ProductFreezingModalAfterCourse from "./modal/ProductFreezingModalAfterCourse";
import ProductFreezingModalAfterDelipidation from "./modal/ProductFreezingModalAfterDelipidation";
import ProductFreezingModal from "./modal/ProductFreezingModal";
import AuthService from "../../services/AuthService";
import ProductWashingModal from "./modal/ProductWashingModal";
import ProductAfterWashingFreezingModal from "./modal/ProductAfterWashingFreezingModal";
import ProductAfterWashingSterilationModal from "./modal/ProductAfterWashingSterilationModal";


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
            } else if (cell === "Dondurma 1") {
              styleVar = "btn btn-warning";
            } else if (cell === "Delipidation") {
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

    ProductService.getAllPreprocessingProducts()
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
        // (Ön İşlem - Kabul) => (Dondurma 1)
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
    } else if (row.status === "Dondurma 1 Sonrası") {
      return (
        // Dondurma 1 => Dondurma 1 - Kabul
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
    } 
    
    
    else if (row.status === "Öğütme (Course) Sonrası") {
     // Course Öğütme Sonrası -> Öğütme (Course)
      return (
        <div>
         <ProductCoarseModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performCoarseState_accept}
            callback_reject={this.performCoarseState_reject}
          />
        </div>
    
      );
    } else if (row.status === "Dondurma 2 Sonrası") {
         // Delipidation -> Kimyasal Sterilizasyon
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
    } else if (row.status === "İnce Öğütme Sonrası") {
      return (
        <div>
        <ProductWashingModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_accept={this.performWashing_accept}
          callback_reject={this.performWashing_reject}
        />
      </div>
        /*
        <ProductFreezingModalAfterDelipidation
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_accept={this.performFreezingAfterDelipidation_accept}
          callback_reject={this.performCourseGrinding_reject}
        />
        */
      );
    } else if(row.status === "Delipidation Sonrası"){
        // Delipidation -> Delipidation
      return(
      <div>


        <ProductAfterWashingFreezingModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performAfterWashingFreezing_accept}
            callback_reject={this.performAfterWashingFreezing_reject}
        />

        <ProductAfterWashingSterilationModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performAfterWashingSterilation_accept}
            callback_reject={this.performAfterWashingSterilation_reject}
        />  
   </div>
);

    } else if (row.status === "Dondurma 3 Sonrası"){
      return (
       
        <div>

        <ProductAfterWashingSterilationModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performAfterWashingSterilation_accept}
            callback_reject={this.performAfterWashingSterilation_reject}
        />  

        </div>
      );
    }
    else if(row.status === "Sterilizasyon"){
      return (
        <div>

        </div>
      );
    } 
  }

  performCoarseState_accept(row, data) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;
        product.location = data;
        product.status = "Dondurma 2 Sonrası";

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

  performCoarseState_reject(row, data) {


  }

  performFreezingState_accept(row, data) {
    // öğütme -> Delipidation
    // location change, state change
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;
        product.location = data;
        product.status = "Dondurma 1 Sonrası";

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
  performCoarse(row) {
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

  performFineGrilling(row) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "İnce Öğütme Sonrası";

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

  performAfterWashingSterilation_accept(row){
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Paketleme";

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

  performAfterWashingSterilation_reject(row){
    
  }

  performAfterWashingFreezing_accept(row){
        // Dondurucuya Koy (After Delipidation) -> Sterilizasyon

        ProductService.getProductById(row.id)
        .then((res) => {
          let product = res.data;
  
          product.status = "Dondurma 3 Sonrası";
  
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

  performAfterWashingFreezing_reject(row){}

  performFreezingAfterDelipidation_reject(row) {}

  performCourseGrinding_reject(row) {}

  

  performWashing_accept(row) {


    // Delipidation -> Delipidation (Yıkama)

    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Delipidation Sonrası";

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

  performWashing_reject(row) {
  }

  performCourseGrinding_accept(row) {


    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Öğütme (Course) Sonrası";

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

        var preProcessingList = ["Kesme", "Delipidation", "Kartilaj Alma"];
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
        ProductService.getAllPreprocessingProducts().then((res) => {
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
