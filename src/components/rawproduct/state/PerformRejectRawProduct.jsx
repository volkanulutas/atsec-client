import React, { Component } from "react";
import { Button } from "reactstrap";

class PerformRejectRawProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      callback_accept: props.callback_accept,
      callback_reject: props.callback_reject,
      callback_modalToggle: props.callback_modalToggle,
      tcNo: "",
      // TODO: ek dokumanlar
      errors: [],
    };

    // callback
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.changeTcNoHandler = this.changeTcNoHandler.bind(this);
  }

  componentDidMount() {}

  changeTcNoHandler = (event) => {
    this.setState({ tcNo: event.target.value });
  };

  accept(event) {
    event.preventDefault();

    var errors = [];
    if (this.state.tcNo === undefined || this.state.tcNo === "") {
      errors.push("tcNo");
    }

    this.setState({ errors: errors });
    if (errors.length <= 0) {
      this.state.callback_modalToggle();
      this.state.callback_accept(this.state.data, this.state.tcNo);
    }
  }

  reject(event) {
    event.preventDefault();
    this.state.callback_modalToggle();
    this.state.callback_reject(this.state.data, this.state.tcNo);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              Red ... Atık
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Tıbbi Atık Taşıma Kimlik No:</label>
                    <input
                      placeholder="Kimlik No"
                      name="tcNo"
                      className={
                        this.hasError("tcNo")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      value={this.state.tcNo}
                      onChange={this.changeTcNoHandler}
                    />
                    <div
                      className={
                        this.hasError("tcNo") ? "inline-errormsg" : "hidden"
                      }
                    >
                      Kimlik No girmelisiniz.
                    </div>
                  </div>
                  <div className="form-group">
                    <Button color="primary" onClick={this.accept}>
                      Tamam
                    </Button>{" "}
                    <Button color="danger" onClick={this.reject}>
                      Vazgeç
                    </Button>
                  </div>
                </form>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PerformRejectRawProduct;
