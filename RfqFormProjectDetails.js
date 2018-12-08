import React from "react";
import { Col, Card, CardBody, CardTitle, Button, Collapse, FormGroup, Form, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";

class RfqFormProjectDetails extends React.Component {
  state = {
    budget_isValid: false,
    date_isValid: {},
    collapse: false
  };
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleChange = e => {
    this.props.onChange({
      ...this.props.projectDetails,
      [e.target.name]: e.target.value
    });
  };

  handleBudgetChange = e => {
    const budget = e.target.value;
    this.props.onChange({
      ...this.props.projectDetails,
      budget
    });
  };

  handleDateChange = ({ projectStartDate, projectDueDate }) => {
    projectStartDate = projectStartDate || this.props.projectDetails.projectStartDate;
    projectDueDate = projectDueDate || this.props.projectDetails.projectDueDate;

    if (projectStartDate.isAfter(projectDueDate)) {
      projectDueDate = projectStartDate;
    }
    this.props.onChange({
      ...this.props.projectDetails,
      projectStartDate,
      projectDueDate
    });
  };

  handleProjectStartDateChange = projectStartDate => this.handleDateChange({ projectStartDate });

  handleProjectDueDateChange = projectDueDate => this.handleDateChange({ projectDueDate });

  render() {
    console.log("rendering Project Details Form");

    let styleRfq = {
      color: "#595454",
      fontSize: 28
    };

    return (
      <div>
        <Button
          color="warning"
          onClick={() => this.toggle()}
          style={{ marginBottom: ".50rem" }}
          size="lg"
          block
        >
          Marketing Project Details
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <CardTitle>
                <span style={styleRfq}>Project Details </span>
              </CardTitle>
              <br />
              <br />

              <Form>
                <FormGroup color="success">
                  <Row>
                    <Col xs="">
                      <label>Description</label>
                      <textarea
                        type="text"
                        name="description"
                        value={this.props.projectDetails.description}
                        onChange={this.handleChange}
                        className=" form-control"
                        placeholder="Description of requested services"
                        required
                        // rows="5"
                        cols="15"
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label>Budget</label>
                      <input
                        type="text"
                        name="budget"
                        list="budgetSelect"
                        className=" form-control"
                        onChange={this.handleChange}
                        placeholder="Monthly Marketing Budget"
                        value={this.props.projectDetails.budget}
                        required
                        style={{ borderColor: "#28D094" }}
                      />
                      <datalist id="budgetSelect">
                        <option value="$200-$500 / month " />
                        <option value="$500 - $1000 / month" />
                        <option value="$1000 - $3000 / month" />
                        <option value="above $3000 / month" />
                      </datalist>
                    </Col>

                    <Col>
                      <label>Project Start Date</label>
                      <DatePicker
                        name="projectStartDate"
                        selected={this.props.projectDetails.projectStartDate}
                        selectsStart
                        projectStartDate={this.props.projectDetails.projectStartDate}
                        projectDueDate={this.props.projectDetails.projectDueDate}
                        onChange={this.handleProjectStartDateChange}
                        type="date"
                        className=" form-control is-valid"
                        placeholder="Project Start Date"
                        style={{ borderColor: "#28D094" }}
                        z
                      />
                    </Col>

                    <Col>
                      <label>Project Due Date</label>
                      <DatePicker
                        name="projectDueDate"
                        selected={this.props.projectDetails.projectDueDate}
                        selectsEnd
                        projectStartDate={this.props.projectDetails.projectStartDate}
                        projectDueDate={this.props.projectDetails.projectDueDate}
                        onChange={this.handleProjectDueDateChange}
                        type="date"
                        className=" form-control is-valid"
                        placeholder="Project Due Date"
                        style={{ borderColor: "#28D094" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <br />
                      <div className="RfqForm">
                        <button
                          type="button"
                          className="login btn btn-success  text-uppercase white font-small-2 box-shadow-2 border-0 "
                          onClick={this.props.onToggle}
                          style={{ margin: 10 }}
                        >
                          <i className="fa fa-eye mr-2" aria-hidden="true" />
                          Preview RFQ Details
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

export default withRouter(RfqFormProjectDetails);
