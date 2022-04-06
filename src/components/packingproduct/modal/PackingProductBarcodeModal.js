import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import ProductPreprocessingState from "../state/PackingProductPreprocessingState";

class PackingProductBarcodeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      data: props.data,
      row: props.row,
      callback_accept: props.callback_accept,
      callback_reject: props.callback_reject,
      fade: true,

      errors: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Barkod Oluştur
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          fade={this.state.fade}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Ön İşlem Öncesi</ModalHeader>
          <ModalBody>
            <ProductPreprocessingState
              errors={this.errors}
              row={this.state.row}
              data={this.state.data}
              callback_modalToggle={this.toggle}
              callback_accept={this.state.callback_accept}
              callback_reject={this.state.callback_reject}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PackingProductBarcodeModal;
