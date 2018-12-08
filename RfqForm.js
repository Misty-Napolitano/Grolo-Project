import React from "react";
import {
  Col,
  Card,
  CardTitle,
  Form,
  CardBody,
  FormGroup,
  Label,
  ListGroupItemText
} from "reactstrap";
import styles from "./RfqForm.module.css";
import RfqFormBusinessInfo from "./RfqFormBusinessInfo";
import RfqFormProjectDetails from "./RfqFormProjectDetails";
import RfqFormContactInfo from "./RfqFormContactInfo";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import RfqModal from "simple-react-modal";
import RfqInquiryContainer from "./RfqInquiryContainer";
class RfqForm extends React.Component {
  state = {
    businessInfo: {
      company: "",
      street: "",
      suite: "",
      city: "",
      state: "",
      zip: "",
      businessType: "",
      subscriptionLevelId: ""
    },
    contactInfo: {
      contactName: "",
      title: "",
      phone: "",
      email: "",
      checked1: false //decision maker
    },

    projectDetails: {
      description: "",
      budget: "",
      projectStartDate: moment({}),
      projectDueDate: moment({})
    }
  };

  handleCancelBusinessInfo = e => {
    console.log("handleCancel is firing");
    e.preventDefault();
    this.setState({
      businessInfo: {
        company: "",
        street: "",
        suite: "",
        city: "",
        state: "",
        zip: "",
        businessType: "",
        subscriptionLevelId: ""
      }
    });
  };

  handleCancelContactInfo = e => {
    console.log("handleCancel is firing");
    e.preventDefault();
    this.setState({
      contactInfo: {
        contactName: "",
        title: "",
        phone: "",
        email: "",
        checked1: false,
        isOpen: false
      }
    });
  };

  handleCancelProjectDetails = e => {
    console.log("handleCancel is firing");
    e.preventDefault();
    this.setState({
      projectDetails: {
        description: "",
        budget: "",
        projectStartDate: moment({}),
        projectDueDate: moment({})
      }
    });
  };

  changeBusinessInfo = businessInfo => {
    this.setState({ businessInfo });
  };

  changeContactInfo = contactInfo => {
    this.setState({ contactInfo });
  };

  changeProjectDetails = projectDetails => {
    this.setState({ projectDetails });
  };

  toggleModal = e => {
    console.log("Toggle Modal is firing");
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleRfqSubmitted = e => {
    console.log("Axios Post is firing");
    axios
      .post("/api/quotes", {
        company: this.state.businessInfo.company,
        street: this.state.businessInfo.street,
        suite: this.state.businessInfo.suite,
        city: this.state.businessInfo.city,
        state: this.state.businessInfo.state,
        zip: this.state.businessInfo.zip,
        businessType: this.state.businessInfo.businessType,
        contactName: this.state.contactInfo.contactName,
        phone: this.state.contactInfo.phone,
        title: this.state.contactInfo.title,
        email: this.state.contactInfo.email,
        checked1: this.state.contactInfo.checked1,
        description: this.state.projectDetails.description,
        budget: this.state.projectDetails.budget,
        subscriptionLevelId: this.state.projectDetails.subscriptionLevelId,
        projectStartDate: this.state.projectDetails.projectStartDate,
        projectDueDate: this.state.projectDetails.projectDueDate
      })
      .then(response =>
        this.setState({ isOpen: false, success: true, error: false }, () =>
          this.props.history.push("/")
        )
      )
      .catch(error => this.setState({ success: false, error: true }));
  };

  render() {
    console.log("rendering RFQ Form");

    let fontStyle = {
      color: "#f50a58",
      fontSize: 16
      // margin: 50
    };

    let styleRfq = {
      color: "#595454",
      fontSize: 28,
      margin: "center"
    };
    return (
      <div>
        <Card body style={{ borderColor: "#28D094" }}>
          <CardTitle className={styles.header}>
            <span>
              <h1 style={styleRfq}>Request For Quotation</h1>

              <h6 style={fontStyle}>Small business marketing has never been easier.</h6>
            </span>
          </CardTitle>
          <img
            src="https://images.unsplash.com/photo-1535017614657-1c6f308729b8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aabe038ede68e0c0f4e899a79c501ba9&auto=format&fit=crop&w=500&q=60"
            alt="marketing strategies"
          />
          <RfqFormBusinessInfo
            businessInfo={this.state.businessInfo}
            onChange={this.changeBusinessInfo}
            onClick={this.handleCancelBusinessInfo}
          />
          <RfqFormContactInfo
            contactInfo={this.state.contactInfo}
            onChange={this.changeContactInfo}
            onClick={this.handleCancelContactInfo}
          />

          <RfqFormProjectDetails
            projectDetails={this.state.projectDetails}
            onChange={this.changeProjectDetails}
            onClick={this.handleCancelProjectDetails}
            onToggle={this.toggleModal}
          />
        </Card>
        <div>
          <Col>
            <div>
              <RfqModal show={this.state.isOpen} onClose={this.toggleModal}>
                <Form>
                  <Card>
                    <CardBody style={{ backgroundColor: "#95f8bf" }}>
                      <h3>
                        <strong>Business Info</strong>
                      </h3>
                      <FormGroup inline>
                        <Label for="company"> Company Name</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.businessInfo.company}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="street">Street Address</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.businessInfo.street}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="suite">Suite</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.businessInfo.suite}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="city">City</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.businessInfo.city}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="state">State</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.businessInfo.state}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="zip">Zip</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.businessInfo.zip}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody style={{ backgroundColor: "#c5cae9" }}>
                      <h3>
                        <strong>Contact Info</strong>
                      </h3>
                      <FormGroup inline>
                        <Label for="contactName">Contact Name</Label>
                        <Col sm={10}>
                          <ListGroupItemText>
                            {this.state.contactInfo.contactName}
                          </ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="title">Title/Position</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.contactInfo.title}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="phone">Telephone #</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.contactInfo.phone}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="email">Email</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.contactInfo.email}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody style={{ backgroundColor: "#ffccbc" }}>
                      <h3>
                        <strong>Project Details</strong>
                      </h3>
                      <FormGroup inline>
                        <Label for="description">Requested Services</Label>
                        <Col sm={10}>
                          <ListGroupItemText>
                            {this.state.projectDetails.description}
                          </ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="budget">Budget</Label>
                        <Col sm={10}>
                          <ListGroupItemText>{this.state.projectDetails.budget}</ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="projectStartDate">Targeted Start Date</Label>
                        <Col sm={10}>
                          <ListGroupItemText>
                            {" "}
                            {this.state.projectDetails.projectStartDate === null
                              ? "Null"
                              : moment(this.state.projectDetails.projectStartDate).format("LL")}
                          </ListGroupItemText>
                        </Col>
                      </FormGroup>
                      <FormGroup inline>
                        <Label for="projectDueDate">Targeted End Date</Label>
                        <Col sm={10}>
                          <ListGroupItemText>
                            {" "}
                            {this.state.projectDetails.projectDueDate === null
                              ? "Null"
                              : moment(this.state.projectDetails.projectDueDate).format("LL")}
                          </ListGroupItemText>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <button
                        type="button"
                        className="login btn btn-success  text-uppercase white font-small-4 box-shadow-2 border-0 "
                        onClick={this.handleRfqSubmitted}
                        style={{ margin: 10 }}
                      >
                        <i className="fa fa-thumbs-o-up mr-2" />
                        Submit
                      </button>
                      <button
                        type="button"
                        className="login btn btn-warning  text-uppercase white font-small-4 box-shadow-2 border-0 "
                        onClick={this.toggleModal}
                        style={{ margin: 10 }}
                      >
                        <i className="fa fa-pencil mr-2" aria-hidden="true" />
                        Edit
                      </button>
                    </CardBody>
                  </Card>
                </Form>
              </RfqModal>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
export default RfqForm;
