import React, { useState } from "react";
import { Alert, Col, Container } from "reactstrap";
import { CSSTransition } from "react-transition-group";

const AlertMessage = (props) => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  const handleVisible = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };
  return (
    <div>
      <Alert
        show={visible}
        color={props.color}
        isOpen={visible}
        toggle={onDismiss}
        allowOutsideClick={false}
      >
        {props.message}
      </Alert>
    </div>
  );
};
export default AlertMessage;
