import React from "react";
import "./Deletedata.css";

const Deletedata = ({ setOpenModal })=> {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false);}}> X </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Delete?</h1>
        </div>

        <div className="footer">
          <button id="cancelBtn"
           onClick={() => {
            setOpenModal(false);
            }}>
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Deletedata;
