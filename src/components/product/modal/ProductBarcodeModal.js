import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

import ViewBarcodePdfComponent from "../ViewBarcodePdfComponent";
import ProductService from "../../../services/ProductService";

class ProductBarcodeModal extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
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
  }

  componentDidMount(){
    this.state.pdfFile = this.state.product.files[0].data; // TODO: 0 silinmelidir.
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
  }

  no(){
    this.toggle();
  }

  findComponent(){
      return <ViewBarcodePdfComponent 
      callbackModalYes={this.yes}
      callbackModalNo={this.no}
      pdfFile = {this.state.pdfFile}
     />;
  }

  render() {
    return (
      <div>
        <Button color="success" className="vlu-left-margin" onClick={this.toggle} disabled={!this.state.isEditable}>
          Etiket Oluştur22
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

export default ProductBarcodeModal;
