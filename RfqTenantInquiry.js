import React from "react";
import { Input, Table, Col, Row } from "reactstrap";
import ReactDOM from "react-dom";
import axios from "axios";
import { getRfqSearch } from "./RfqAxios";
// import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Paginator from "../../shared/Paginator";
import moment from "moment";
// import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import RfqModal from "../../shared/FormModal";

export default class RfqTenantInquiry extends React.Component {
  state = {
    pageIndex: 0,
    pageSize: 10,
    allRfqs: null,
    modal: null,
    searchOn: false,
    search: "",
    data: "",
    totalCount: "",
    totalPages: 0,
    isOpen: false,
    id: undefined
  };

  componentDidMount = () => {
    if (!this.state.searchOn) {
      this.getSearch();
    }
  };

  getAll = () => {
    axios.get("/api/quotes/" + this.state.pageIndex + "/" + this.state.pageSize).then(response => {
      console.log(response, "getAll is firing");
      const pageSize = this.state.pageSize;
      const pageIndex = this.state.pageIndex;
      const data = response.data.item.pagedItems;
      const totalCount = response.data.item.totalCount;
      const totalPages = Math.ceil(totalCount / pageSize);
      this.setState({
        allRfqs: data,
        totalCount,
        totalPages
      });
    });
  };

  getSearch = () => {
    const pageSize = this.state.pageSize;
    const pageIndex = this.state.pageIndex;
    const search = this.state.search;
    console.log("Search going..", search);
    this.setState({ searchOn: true });

    getRfqSearch(search, pageIndex, pageSize).then(response => {
      console.log("SearchData", response.data.item);
      const search = response.data.item.pagedItems;
      const totalCount = response.data.item.totalCount;
      const totalPages = Math.ceil(totalCount / pageSize);
      // this.setState({ allRfqs: search });
      this.setState({
        allRfqs: search,
        totalCount,
        totalPages
      });
    });
  };

  goTo = newPage => {
    this.setState(
      {
        pageIndex: Number(newPage)
      },
      () => {
        this.getSearch();
      }
    );
  };
  // handleSelectRfq = () => {
  //   axios.get("/api/quotes/" + this.state.pageIndex + "/" + this.state.pageSize).then(response => {
  //     const rfq = response.data.item.pagedItems;
  //     this.props.history
  //       .push("./RfqForm")
  //       .catch(error => this.setState({ success: false, error: true }));
  //     console.log("get RFQ", response.data.item.pagedItems);
  //     console.log(rfq);
  //     this.setState({ rfq });
  //   });
  // };

  handleSelectRfq = id => {
    // const baseUrl = "/api/quotes";
    // const id = this.state.id;

    axios
      .get("/api/quotes/" + id)
      .then(function(response) {
        console.log(response, "handleSelectRfq is firing");
      })
      .then(response =>
        this.setState({ isOpen: false, success: true, error: false }, () =>
          this.props.history.push("rfqs/RfqForm/" + id)
        )
      )

      .catch(error => this.setState({ success: false, error: true }));
  };

  // .then(response => {
  //   console.log(response + "handleSelectRfq is firing");
  // })
  // .then(response => this.props.history.closest("/rfqs/RfqForm"))
  // .catch(error => this.setState({ success: false, error: true }));

  render() {
    const allRfqs = this.state.allRfqs;
    console.log("everything in state", this.state);
    if (!allRfqs) {
      return <h1> Loading...</h1>;
    } else {
      return (
        <div>
          <div>
            {/* -----search bar----- */}
            <div>
              <Input
                defaultValue={this.state.search}
                onKeyPress={this.handleSearch}
                onChange={this.onSearchChange}
                placeholder="Search by Business or Address"
              />
            </div>
            <div className="card">
              <Table striped>
                <thead>
                  <tr
                    style={{ backgroundColor: "#28D094", textAlign: "center" }}
                    className="text-dark"
                  >
                    <th style={{ width: "25%" }}>Company Name</th>
                    <th style={{ width: "10%" }}>City</th>
                    <th style={{ width: "5%" }}>State</th>
                    <th style={{ width: "20%" }}>Project Start Date</th>
                    <th style={{ width: "40%" }}>Description of Requested Services</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {allRfqs && (
                    <>
                      {allRfqs.map(rfqs => (
                        <tr key={rfqs.id}>
                          <td style={{ textAlign: "center" }}>{rfqs.company}</td>
                          <td style={{ textAlign: "center" }}>{rfqs.city}</td>
                          <td style={{ textAlign: "center" }}>{rfqs.state}</td>

                          <td style={{ textAlign: "center" }}>
                            {rfqs.projectStartDate === null
                              ? "Null"
                              : moment(rfqs.projectStartDate).format("LL")}
                          </td>
                          <td style={{ textAlign: "center" }}>{rfqs.description}</td>

                          <td style={{ textAlign: "center" }} className="container">
                            <button
                              type="button"
                              className="btn btn-success  text-uppercase white font-small-2 box-shadow-2 border-0 btn-xs"
                              onClick={() => this.handleSelectRfq(rfqs.id)}
                              style={{ margin: 10 }}
                            >
                              {/* <i className="fa fa-eye mr-2" aria-hidden="true" /> */}
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
            <Paginator
              currentPage={this.state.pageIndex}
              totalPages={this.state.totalPages}
              totalCount={this.state.totalCount}
              goTo={this.goTo}
              style={{ marginTop: "16px" }}
              className="m-2"
            />
            <Col>
              <div>
                <RfqModal show={this.state.isOpen} onClose={this.handleRfqSubmit}>
                  <Row>
                    <Col>
                      <ul>
                        <input>{this.state.company}</input>
                        <input>{this.state.street}</input>
                        <input>{this.state.city}</input>
                        <input>{this.state.state}</input>
                        <input>{this.state.suite}</input>
                        <input>{this.state.zip}</input>
                        <input>{this.state.contactName}</input>
                        <input>{this.state.title}</input>
                        <input>{this.state.phone}</input>
                        <input>{this.state.email}</input>
                        <input>{this.state.budget}</input>
                        <input>
                          {this.state.projectStartDate === null
                            ? "Null"
                            : moment(this.state.projectStartDate).format("LL")}
                        </input>
                        <input>
                          {this.state.projectDueDate === null
                            ? "Null"
                            : moment(this.state.projectDueDate).format("LL")}
                        </input>
                      </ul>
                      <button
                        type="button"
                        className="btn btn-success px-4 py-2 text-uppercase white font-small-4 box-shadow-2 border-0 btn btn-secondary"
                        // disabled={!this.state.email_isValid || !this.state.phone_isValid}
                        // onClick={this.toggleModal}
                        onClick={this.handleRfqSubmitted}
                        style={{ margin: 10 }}
                      >
                        <i className="fa fa-thumbs-o-up mr-2" />
                        Submit
                      </button>
                      <button
                        type="clear"
                        className="btn btn-warning px-4 py-2 text-uppercase white font-small-4 box-shadow-2 border-0 btn btn-secondary"
                        onClick={this.toggleModal}
                        style={{ margin: 10 }}
                      >
                        <i className="fa fa-pencil mr-2" aria-hidden="true" />
                        Edit
                      </button>
                      {/* <button btnStyle="default" onClick={this.toggleModal}>
                        Close
                      </button> */}
                    </Col>
                  </Row>
                </RfqModal>
              </div>
            </Col>
            {/* {this.state.modal && this.state.id && this.state.allRfqs && (
            <Modal
              caption="Preview RFQ"
              modal={this.state.modal}
              key={this.state.id || 0}
              id={this.state.id}
            /> */}
          </div>
        </div>
      );
    }
  }
}
