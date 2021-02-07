import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import CreateLocationComponent from "../../../components/location/CreateLocationComponent";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      data: props.data,
      callback: props.callback,
      fade: true,
    };
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  delete() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
    this.state.callback(this.state.data);
  }

  render() {
    return (
      <div>
        <Button color="success" className="width-select2" onClick={this.toggle}>
          +
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          fade={this.state.fade}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Sil</ModalHeader>
          <CreateLocationComponent id={"_add"} />
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>
              Çıkış
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddModal;
