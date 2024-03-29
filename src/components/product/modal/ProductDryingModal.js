import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import ProductDryingState from "../state/ProductDryingState";

class ProductDryingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      data: props.data,
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
        <Button color="success" onClick={this.toggle}>
          Kurutma Yap
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          fade={this.state.fade}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Kurutma</ModalHeader>
          <ModalBody>
            <ProductDryingState
              errors={this.errors}
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

export default ProductDryingModal;