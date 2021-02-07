import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import PerformAcceptRawProduct from "../../rawproduct/state/PerformAcceptRawProduct";

class PerformAcceptModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      data: props.data,
      callback_preProcessing: props.callback_preProcessing,
      callback_accept: props.callback_accept,
      fade: true,
      errors: [],
    };
    this.toggle = this.toggle.bind(this);
    this.preProcessing = this.preProcessing.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  preProcessing() {
    this.state.callback_preProcessing(this.state.data);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.preProcessing}>
          Ön İşleme Al
        </Button>
        <Button color="danger" onClick={this.toggle}>
          Reddet
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          fade={this.state.fade}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Kabul ... Reddet</ModalHeader>
          <ModalBody>
            <PerformAcceptRawProduct
              errors={this.errors}
              data={this.state.data}
              callback_modalToggle={this.toggle}
              callback_accept={this.state.callback_accept}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PerformAcceptModal;
