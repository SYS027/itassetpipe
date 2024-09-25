import React from "react";

function AddressInput({ address, setAddress }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Address</label>
      <br />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="form-control"
      />
    </div>
  );
}

export default AddressInput;
