import React from "react";

function EmployeeDropdown({ emp, selectedEmployeeId, setSelectedEmployeeId }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Assign To</label>
      <br />
      <select
        className="form-control"
        value={selectedEmployeeId}
        onChange={(e) => setSelectedEmployeeId(e.target.value)}
      >
        <option value="">--Choose a User--</option>
        {Array.isArray(emp) ? (
          emp.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))
        ) : (
          <p>no data found</p>
        )}
      </select>
    </div>
  );
}

export default EmployeeDropdown;
