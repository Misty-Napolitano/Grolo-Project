import React from "react";
import {
  Card,
  CardBody,
  Collapse,
  CardTitle,
  Button,
  Col,
  Label,
  Input,
  FormGroup,
  FormFeedback,
  Form,
  Row
} from "reactstrap";
import { withRouter } from "react-router-dom";
import StatesDropdown from "./StatesDropdown.js";

class RfqFormBusinessInfo extends React.Component {
  state = {
    collapse: false
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  selectDropdown = e => {
    const state = e.target.value;
    this.props.onChange({
      ...this.props.businessInfo,
      state
    });
  };

  handleChange = e => {
    this.props.onChange({
      ...this.props.businessInfo,
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log("rendering Bus Info Form");

    let styleRfq = {
      color: "#595454",
      fontSize: 28
    };

    return (
      <div>
        <Button
          color="success"
          onClick={() => this.toggle()}
          style={{ marginBottom: ".50rem" }}
          size="lg"
          block
        >
          Business Information
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <CardTitle>
                <span style={styleRfq}>Business Info</span>
              </CardTitle>
              <br />
              <br />
              <Form id="businessInfo">
                <FormGroup>
                  <Row>
                    <Col xs="5">
                      <label>Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={this.props.businessInfo.company}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Company name"
                        style={{ borderColor: "#28D094" }}
                        required
                      />
                      <FormFeedback>This field is required.</FormFeedback>
                    </Col>

                    <Col xs="5">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={this.props.businessInfo.street}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Street Address"
                        style={{ borderColor: "#28D094" }}
                        required
                      />
                    </Col>
                    <Col xs="2">
                      <label>Suite</label>
                      <input
                        type="text"
                        name="suite"
                        value={this.props.businessInfo.suite}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Suite"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="6">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={this.props.businessInfo.city}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="City"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>

                    <Col xs="3">
                      <label>State</label>

                      <StatesDropdown
                        value={this.props.businessInfo.state}
                        onSelectDropdown={this.selectDropdown}
                        placeholder="State"
                        name="state"
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>

                    <Col xs="3">
                      <Label>Zip</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={this.props.businessInfo.zip}
                        onChange={this.handleChange}
                        placeholder="Postal Code"
                        style={{ borderColor: "#28D094" }}
                        required
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label>Type of Business</label>
                      <input
                        list="businessTypeSelect"
                        type="text"
                        name="businessType"
                        value={this.props.businessInfo.businessType}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Select from the drop down menu"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                      <datalist id="businessTypeSelect">
                        <option value="Service" />
                        <option value="Product" />
                        <option value="Both" />
                      </datalist>
                    </Col>

                    <Col>
                      <label>Subscription Level</label>
                      <input
                        list="subscriptionLevelSelect"
                        type="text"
                        name="subscriptionLevelId"
                        value={this.props.businessInfo.subscriptionLevelId}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Select from the drop down menu"
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                      <datalist id="subscriptionLevelSelect">
                        <option value="Basic" />
                        <option value="Standard" />
                        <option value="Premier" />
                      </datalist>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <br />
                      <div>
                        <button
                          type="button"
                          className="login btn btn-primary  text-uppercase white font-small-2 box-shadow-2 border-0 "
                          onClick={() => this.setState({ collapse: !this.state.collapse })}
                          style={{ margin: 10 }}
                        >
                          {/* <i className="fa fa-eye mr-2" aria-hidden="true" /> */}
                          Continue to Contact Info
                        </button>
                      </div>
                    </Col>
                    <Col>
                      <br />
                      <button
                        type="button"
                        className="login btn btn-danger text-uppercase white font-small-4 box-shadow-2  border-0"
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

export default withRouter(RfqFormBusinessInfo);
