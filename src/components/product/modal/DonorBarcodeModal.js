import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
// import pdf from "../modal/test.pdf";

import PdfViewer from "../../pdfmanagement/PdfViewer";
import ViewBarcodePdfComponent from "../ViewBarcodePdfComponent";
import DonorBarcodeService from "../../../services/DonorBarcodeService";

class DonorBarcodeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPdf: false,
      pdf: null,

      productId: props.productId,

      modal: props.initialModalState,
      data: props.data,
      callback: props.callback,
      fade: true,
      isEditable: props.isEditable,
      component: props.component,
      product: props.product,
    };
    this.toggle = this.toggle.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.createBarcode = this.createBarcode.bind(this);
    this.createBarcode2 = this.createBarcode2.bind(this);
  }

  componentDidMount() {}

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  yes() {
    this.toggle();
    if (this.state.callback) {
      this.state.callback(this.state.data);
    }
  }

  no() {
    this.toggle();
  }

  findComponent() {
    return (
      <ViewBarcodePdfComponent
        callbackModalYes={this.yes}
        callbackModalNo={this.no}
        pdfFile={this.state.pdfFile}
      />
    );
  }
  createBarcode() {
    var status = this.state.showPdf;
    this.setState({ showPdf: !status });
  }

  createBarcode2() {
    DonorBarcodeService.getBarcode(this.props.productId);
  }

  render() {
    return (
      <div>
        <PdfViewer
          // pdf={pdf}
          pdf={this.state.pdf}
          onCancel={() => this.setState({ showPdf: false })}
          visible={this.state.showPdf}
        />
        <Button
          color="success"
          className="vlu-left-margin"
          onClick={this.createBarcode2}
          disabled={!this.state.isEditable}
        >
          Etiket Oluştur
        </Button>
      </div>
    );
  }
}

export default DonorBarcodeModal;
