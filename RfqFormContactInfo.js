import React from "react";
import { Card, CardBody, CardTitle, Col, Collapse, Button, FormGroup, Form, Row } from "reactstrap";
import { withRouter } from "react-router-dom";

class RfqFormContactInfo extends React.Component {
  state = {
    error: false,
    email_isValid: false,
    collapse: false
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleChange = e => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.props.onChange({
      ...this.props.contactInfo,
      [e.target.name]: value
    });
  };

  handleEmailChange = e => {
    const email = e.target.value;
    let email_isValid = false;
    if (email.length >= 7 && email.length <= 50) {
      email_isValid = true;
    }
    this.props.onChange({
      ...this.props.contactInfo,
      email
    });
  };

  render() {
    console.log("rendering Contact Info Form");

    let styleRfq = {
      color: "#595454",
      fontSize: 28
    };

    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.toggle()}
          style={{ marginBottom: ".50rem" }}
          size="lg"
          block
        >
          Contact Information
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody style={{ borderColor: "#28D094" }}>
              <CardTitle>
                <span style={styleRfq}>Contact Info</span>
              </CardTitle>
              <br />
              <br />
              <Form id="contactInfo">
                <FormGroup color="success">
                  <Row>
                    <Col>
                      <label> Contact Name </label>
                      <input
                        type="text"
                        value={this.props.contactInfo.contactName}
                        onChange={this.handleChange}
                        name="contactName"
                        className=" form-control"
                        placeholder="Full name of primary contact"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>

                    <Col>
                      <label>Title/Position</label>
                      <input
                        type="text"
                        value={this.props.contactInfo.title}
                        onChange={this.handleChange}
                        name="title"
                        className=" form-control"
                        placeholder="Title or Position in the Company"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>

                    <Col>
                      <br />
                      <br />I am the decision maker{" "}
                      <input
                        type="checkbox"
                        name="checked1"
                        checked={this.props.contactInfo.checked1}
                        onChange={this.handleChange}
                        value={this.props.contactInfo.checked1}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Telephone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={this.props.contactInfo.phone}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Primary Telephone No."
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                      {!this.state.phone_isValid && <span style={{ color: "red" }}> </span>}
                    </Col>

                    <Col>
                      <label>Email</label>
                      <input
                        type="email"
                        value={this.props.contactInfo.email}
                        onChange={this.handleEmailChange}
                        className=" form-control"
                        placeholder="Email"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                      {!this.state.email_isValid && <span style={{ color: "red" }}> </span>}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <br />
                      <div className="RfqForm">
                        <button
                          type="button"
                          className="btn btn-warning  text-uppercase white font-small-2 box-shadow-2 border-0 btn-xs"
                          onClick={() => this.setState({ collapse: !this.state.collapse })}
                          style={{ margin: 10 }}
                        >
                          {/* <i className="fa fa-eye mr-2" aria-hidden="true" /> */}
                          Continue to Project Details
                        </button>
                      </div>
                    </Col>
                    <Col>
                      <br />
                      <button
                        type="button"
                        className="login btn btn-danger  text-uppercase white font-small-4 box-shadow-2 border-0 "
                        onClick={this.props.onClick}
                        style={{ margin: 10 }}
                      >
                        <i className="fa fa-times-circle mr-2" />
                        Cancel
                      </button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default withRouter(RfqFormContactInfo);
