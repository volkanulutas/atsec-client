import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeleteModal from "../util/modal/DeleteModal";
import CustomerService from "../../services/CustomerService";

const { SearchBar } = Search;

class ListCustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      columns: [
        {
          dataField: "identityNumber",
          text: "MÜŞTERİ KODU",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "name",
          text: "İSİM",
          align: "center",
          title: true,
          sort: true,
        },
        {
          dataField: "customerType",
          text: "MÜŞTERİ TİPİ",
          align: "center",
          title: true,
          sort: true,
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
                  onClick={() => this.view(rowId)}
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
    CustomerService.getAllCustomers()
      .then((res) => {
        this.setState({ customers: res.data });
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  add() {
    this.props.history.push("/add-customer/add/_add");
  }

  view(id) {
    this.props.history.push(`/add-customer/view/${id}`);
  }

  update(id) {
    this.props.history.push(`/add-customer/update/${id}`);
  }

  delete = (row) => {
    CustomerService.deleteCustomer(row.id)
      .then((res) => {
        CustomerService.getAllCustomers()
          .then((res) => {
            this.setState({ customers: res.data });
          })
          .catch((ex) => {
            const notify = () => toast("Sunucu ile iletişim kurulamadı. Hata Kodu: LST-CUS-01");
            notify();
          });
      })
      .catch((ex) => {
        const notify = () => toast("Müşteri silinemedi. Hata Kodu: LST-CUS-02");
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
          value: this.state.customers.length,
        },
      ],
    };

    return (
      <div className="container">
          <ToastContainer />
        <div className="col-sm-12 btn btn-info">Müşteri Listesi</div>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.state.customers}
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
                  Müşteri Ekle
                </button>
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

export default ListCustomerComponent;
