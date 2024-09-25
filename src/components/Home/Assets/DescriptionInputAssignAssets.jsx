import React from "react";

function DescriptionInput({ description, setDescription }) {
  return (
    <div className="col-md-4">
      <label htmlFor="#">Description</label>
      <br />
      <textarea
        type="text"
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

export default DescriptionInput;