import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import CreateLocationComponent from "../../../components/location/CreateLocationComponent";
import CreateTissueTypeComponent from "../../../components/tissuetype/CreateTissueTypeComponent";
import CreateDonorInstituteComponent from "../../../components/donorinstitute/CreateDonorInstituteComponent";
import CreateDonorComponent from "../../../components/donor/CreateDonorComponent";
import ViewPdfComponent from "../../../components/keyproduct/ViewPdfComponent";
import CreateCustomerComponent from "../../customer/CreateCustomerComponent";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      data: props.data,
      callback: props.callback,
      fade: true,
      isEditable: props.isEditable,
      component: props.component,
    };
    this.toggle = this.toggle.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
  }

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
    /*
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
    this.state.callback(this.state.data);
    */
  }

  no() {
    this.toggle();
  }

  findComponent() {
    if ("CreateLocationComponent" === this.state.component) {
      return (
        <CreateLocationComponent
          callbackModalYes={this.yes}
          callbackModalNo={this.no}
        />
      );
    } else if ("CreateTissueTypeComponent" === this.state.component) {
      return (
        <CreateTissueTypeComponent
          callbackModalYes={this.yes}
          callbackModalNo={this.no}
        />
      );
    } else if ("CreateDonorInstituteComponent" === this.state.component) {
      return (
        <CreateDonorInstituteComponent
          callbackModalYes={this.yes}
          callbackModalNo={this.no}
        />
      );
    } else if ("CreateDonorComponent" === this.state.component) {
      return (
        <CreateDonorComponent
          callbackModalYes={this.yes}
          callbackModalNo={this.no}
        />
      );
    } else if ("ViewPdfComponent" === this.state.component) {
      return (
        <ViewPdfComponent
          callbackModalYes={this.yes}
          callbackModalNo={this.no}
        />
      );
    } else if ("CreateCustomerComponent") {
      return (
        <CreateCustomerComponent
          callbackModalYes={this.yes}
          callbackModalNo={this.no}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Button
          color="success"
          className="width-select2"
          onClick={this.toggle}
          disabled={!this.state.isEditable}
        >
          +
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          fade={this.state.fade}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal</ModalHeader>
          {this.findComponent()}
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddModal;
