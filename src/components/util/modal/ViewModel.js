import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import ViewPdfComponent from "../../keyproduct/ViewPdfComponent";

class ViewModal extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      modal: props.initialModalState,
      data: props.data,
      callback: props.callback,
      fade: true,
      isEditable: props.isEditable,
      component: props.component,
      viewPdf: props.viewPdf,
    };
    this.toggle = this.toggle.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
  }

  componentDidMount() {
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  yes() {
    this.toggle();
    if(this.state.callback) {
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

  no(){
    this.toggle();
  }

  findComponent(){
    if("ViewPdfComponent" === this.state.component){
      return <ViewPdfComponent 
      callbackModalYes={this.yes}
      callbackModalNo={this.no}
      viewPdf={this.state.viewPdf}
      />;
    }
  }

  render() {
    return (
      <div>
        <Button color="success" className="vlu-left-margin" onClick={this.toggle} disabled={!this.state.isEditable}>
          Ön İzle
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          fade={this.state.fade}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal</ModalHeader>
            {this.findComponent()}
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ViewModal;
