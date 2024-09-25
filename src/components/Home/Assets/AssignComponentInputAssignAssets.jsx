import React from "react";

function AssignComponentInput({ assigncomponent, setAssigncomponent }) {
  return (
    <div className="col-md-4">
      <label htmlFor="#">Assign Component</label>
      <br />
      <input
        type="text"
        className="form-control"
        value={assigncomponent}
        onChange={(e) => setAssigncomponent(e.target.value)}
      />
    </div>
  );
}

export default AssignComponentInput;