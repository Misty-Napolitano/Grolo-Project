import React from "react";

import states from "../../shared/ListofStates.json";

class StatesDropdown extends React.Component {
  render() {
    // console.log("PROPS RFQ FORM", this.props);
    return (
      <div>
        <div className="form-group">
          <div className="controls">
            <select
              onChange={this.props.onSelectDropdown}
              name="select"
              id="select"
              value={this.props.state}
              required
              className="form-control"
            >
              {states &&
                states.map((item, index) => {
                  return (
                    <option key={index} value={item.abbreviation}>
                      {item.abbreviation}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default StatesDropdown;
