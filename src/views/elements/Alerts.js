import React, { Component } from 'react';
import PageAlertContext from '../../vibe/components/PageAlert/PageAlertContext';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  UncontrolledAlert,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class Alerts extends Component {
  constructor() {
    super();
    this.state = {
      alertMessage: '👋 Welcome to our app!',
      alertType: 'primary'
    };
  }
  handleChange = event => {
    this.setState({ alertMessage: event.target.value });
  };
  handleSelect = event => {
    this.setState({ alertType: event.target.value });
  };
  render() {
    return (
      <div>
        <Row>

          <Col md={6}>
            <Card>
              <CardHeader>Page Alert</CardHeader>
              <CardBody>
                <PageAlertContext.Consumer>
                  {context => (
                    <div>
                      <Form>
                        <FormGroup>
                          <Label for="exampleAlert">Alert Message</Label>
                          <Input
                            type="text"
                            name="message"
                            id="exampleAlert"
                            placeholder="Hello"
                            value={this.state.alertMessage}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Type</Label>
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            value={this.state.alertType}
                            onChange={this.handleSelect}>
                            <option value="primary">Primary</option>
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="success">Success</option>
                            <option value="danger">Danger</option>
                          </Input>
                        </FormGroup>
                        <Button
                          onClick={() =>
                            context.setAlert(
                              this.state.alertMessage,
                              this.state.alertType
                            )
                          }>
                          Create Page Alert
                        </Button>
                      </Form>
                    </div>
                  )}
                </PageAlertContext.Consumer>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Alerts;
