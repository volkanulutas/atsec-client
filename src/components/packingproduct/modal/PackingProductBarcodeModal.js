import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import ViewBarcodePdfComponent from "../../product/ViewBarcodePdfComponent";
import PackingProductBarcodeService from "../../../services/PackingProductBarcodeService";

class PackingProductBarcodeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPdf: false,
      pdf: null,

      packingProductId: props.packingProductId,

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

  createBarcode2() {
    PackingProductBarcodeService.getBarcode(this.props.packingProductId);
  }

  render() {
    return (
      <div>
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

export default PackingProductBarcodeModal;
