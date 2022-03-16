import React, { Component, useState } from "react";
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

import ProductService from "../../services/ProductService";
import DeleteModal from "../util/modal/DeleteModal";

import {connect} from 'react-redux';
import { addPdf_BarcodePdfView } from '../../actions';

import ProductCoarseModal from "./modal/ProductCoarseModal";
import ProductPreprocessingModal from "./modal/ProductPreprocessingModal";
import  ProductGranulationStateModal from "./modal/ProductGranulationStateModal";
import ProductFreezingModal from "./modal/ProductFreezingModal";
import AuthService from "../../services/AuthService";
import ProductWashingModal from "./modal/ProductWashingModal";
import ProductAfterWashingFreezingModal from "./modal/ProductAfterWashingFreezingModal";
import ProductAfterWashingSterilationModal from "./modal/ProductAfterWashingSterilationModal";
import ProductDryingModal from "./modal/ProductDryingModal";
import ProductMoistureModal from "./modal/ProductMoistureModal";

import ProductBarcodeModal from "../product/modal/ProductBarcodeModal";
import store from "../../store";

const { SearchBar } = Search;

class ListProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodePdfView: null,
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
            } else if (cell === "Defatting") {
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
    // authService.checkSession();

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

    ProductService.createBarcode(row.id)
    .then((res) => {
      let file = res.data;
      this.props.addPdf_BarcodePdfView(file);
    })
    .catch((ex) => {
      console.error(ex);
    });

      return (
        // (Ön İşlem) => (Ön İşlem - Kabul) Etiket Oluştur
        <div>
          <ToastContainer />
          <ProductPreprocessingModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            row={row}
            callback_accept={this.performPreProcessingState_accept}
            callback_reject={this.performPreProcessingState_reject}
          />
          <ProductBarcodeModal
          productId={row.id}
          class="vlu-left-margin"
          initialModalState={false}
          product={row}
          isEditable={true}
        />
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
          <ProductGranulationStateModal
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
        <div>
        <ProductWashingModal
          style={{ marginRight: "5px" }}
          initialModalState={false}
          data={row}
          callback_accept={this.performWashing_accept}
          callback_reject={this.performWashing_reject}
        />
      </div>
      );
    } 
    else if(row.status === "Defatting Sonrası"){
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

    }
    else if (row.status === "Kurutma"){
      return (
       
        <div>

        <ProductDryingModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performDrying_accept}
            callback_reject={this.performDrying_reject}
        />  

        </div>
      );
    }
    else if (row.status === "Nem Tayini"){
      return (
       
        <div>

        <ProductMoistureModal
            style={{ marginRight: "5px" }}
            initialModalState={false}
            data={row}
            callback_accept={this.performMoisture_accept}
            callback_reject={this.performMoisture_reject}
        />  

        </div>
      );
    }
    
    else if (row.status === "Dondurma 3 Sonrası"){
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

  performCoarseState_accept(row, data, processDate) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;
        product.location = data;
        product.status = "Dondurma 2 Sonrası";

        let statusDate = {
          productStatus:  "Dondurma 2 Sonrası",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: LST-PRD-02");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile bağlantı kurulamadı. Hata Kodu: LST-PRD-01");
        notify();
      });
  }

  performCoarseState_reject(row, data) {
  }

  performFreezingState_accept(row, location, processDate) {
    // öğütme -> Delipidation
    // location change, state change
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;
        product.location = location;
        alert("Dondurma sonrasi");
        product.status = "Dondurma 1 Sonrası";

        let statusDate = {
          productStatus:  "Dondurma 1 Sonrası",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

        // product.granulationType=granulation;

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-04 "+ ex);
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile bağlantı kurulamadı. Hata Kodu: CRT-PRD-03");
        notify();
      });
  }
  performCoarse(row,  processDate) {
    ProductService.getProductById(row.id,)
      .then((res) => {
        let product = res.data;

        product.status = "Dondurma (Course)";

        let statusDate = {
          productStatus:  "Dondurma (Course)",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-06");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-05");
        notify();
      });
  }

  performFreezingAfterDelipidation_accept(row, processDate) {
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Sterilizasyon";

        let statusDate = {
          productStatus:  "Sterilizasyon",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-10");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-09");
        notify();
      });
  }

  performMoisture_accept(row, processDate){
    ProductService.getProductById(row.id)
    .then((res) => {
      let product = res.data;

      product.status = "Paketleme";

      let statusDate = {
        productStatus:  "Paketleme",
        processDate: new Date(processDate).getTime(),
      };
      product.productStatusDateRequests.push(statusDate);

      ProductService.updateProduct(row.id, product)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((ex) => {
          const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-23");
          notify();
        });
    })
    .catch((ex) => {
      const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-24");
      notify();
    });
  }

  performMoisture_reject(row){
  }

  performDrying_accept(row, processDate){

    ProductService.getProductById(row.id)
    .then((res) => {
      let product = res.data;

      product.status = "Nem Tayini";

      let statusDate = {
        productStatus:  "Nem Tayini",
        processDate: new Date(processDate).getTime(),
      };
      product.productStatusDateRequests.push(statusDate);

      ProductService.updateProduct(row.id, product)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((ex) => {
          const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-21");
          notify();
        });
    })
    .catch((ex) => {
      const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-22");
      notify();
    });
  }

  performDrying_reject(row){}

  performAfterWashingSterilation_accept(row, processDate){
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Kurutma";

        let statusDate = {
          productStatus:  "Kurutma",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

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

  performAfterWashingFreezing_accept(row, processDate){
        // Dondurucuya Koy (After Delipidation) -> Sterilizasyon

        ProductService.getProductById(row.id)
        .then((res) => {
          let product = res.data;
  
          product.status = "Dondurma 3 Sonrası";

          let statusDate = {
            productStatus:  "Dondurma 3 Sonrası",
            processDate: new Date(processDate).getTime(),
          };
          product.productStatusDateRequests.push(statusDate);
  
          ProductService.updateProduct(row.id, product)
            .then((res) => {
              window.location.reload(false);
            })
            .catch((ex) => {
              const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-11");
              notify();
            });
        })
        .catch((ex) => {
          const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-12");
          notify();
        });
  }

  performAfterWashingFreezing_reject(row){}

  performFreezingAfterDelipidation_reject(row) {}

  performCourseGrinding_reject(row) {}

  performWashing_accept(row, processDate) {
    // Delipidation -> Delipidation (Yıkama)

    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Defatting Sonrası";

        let statusDate = {
          productStatus:  "Defatting Sonrası",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-14");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-13");
        notify();
      });
  }

  performWashing_reject(row) {
  }

  performCourseGrinding_accept(row, granulationTypeList, processDate) {

    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;

        product.status = "Öğütme (Course) Sonrası";
        product.granulationType = granulationTypeList;

        let statusDate = {
          productStatus:  "Öğütme (Course) Sonrası",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-15");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-16");
        notify();
      });
  }

  performFreezingState_reject(row, data) {}

 

  performPreProcessingState_accept(row, productFormTypeList, processDate) {
   
    ProductService.getProductById(row.id)
      .then((res) => {
        let product = res.data;
   
        product.status = "Ön İşlem - Kabul";

         let statusDate = {
          productStatus:  "Ön İşlem - Kabul",
          processDate: new Date(processDate).getTime(),
        };
        product.productStatusDateRequests.push(statusDate);

      
        var preProcessingList = ["Kesme", "Defatting", "Kartilaj Alma"];
        product.performPreProcessingType = preProcessingList;
        product.productFormType = productFormTypeList;

        ProductService.updateProduct(row.id, product)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((ex) => {
            const notify = () => toast("Ürün güncellenemedi. Hata Kodu: CRT-PRD-18 " + ex);
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: CRT-PRD-17 " + ex);
        notify();
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
        const notify = () => toast("Ürün silinemedi. Hata Kodu: CRT-PRD-19");
        notify();
      })
      .catch((ex) => {
        const notify = () => toast("Sunucu ile bağlantı kurulamadı. Hata Kodu: CRT-PRD-20");
        notify();
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
        <div className="col-sm-12 btn btn-info">Ürün Listesi - Üretim</div>
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
function mapStateToProps(state){
  return {
    barcodePdfView: state.barcodePdfView,
  }
}

export default connect(mapStateToProps, 
  {addPdf_BarcodePdfView})
  (ListProductComponent);