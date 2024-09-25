import React from "react";
import { Link } from "react-router-dom";
import LatestSubscription from "./LatestSubscription";

const DashboardTabledata = () => {  
  return (
    <>
      <div className="container">
      <div className="button-asset-dashboard">
      <Link to="/addlist" className="btn btn-primary btn" id="assets-unasign-button">
            UNASSIGN ASSETS
          </Link>
      <Link to="/assignasset" className="btn btn-dark btn" id="assets-asign-button">
            ASSIGN ASSETS
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <h4>Latest Assets Purchase</h4>
          </div>

          <div className="col-md-6">
            <button
              href="/home/assetadd"
              className="btn btn-primary btnn "
              id="new_puechse"
            >
              New Purchase +
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3 cardborder" id="form-div">
        <table className="table">
          <thead>
            <tr className="lightblue">
              <th>Product name</th>
              <th>Brand</th>
              <th>Product category</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
              <th>Purchase Method</th>
            </tr>
          </thead>

          <tbody>
            <tr className="odd">
              <td>iphone 7 plus</td>
              <td>Apple</td>
              <td>Mobile phones</td>
              <td>$700</td>
              <td>Jan 20 ,2020</td>
              <td>Credit Card</td>
            </tr>

            <tr className="odd">
              <td>Laptop inspiron 15</td>
              <td>Dell</td>
              <td>laptops</td>
              <td>$3,500</td>
              <td>Dec 13,2019</td>
              <td>debit Card</td>
            </tr>

            <tr className="odd">
              <td>Play station 5</td>
              <td>Sony</td>
              <td>Gaming</td>
              <td>$4,860</td>
              <td>Oct 8,2020</td>
              <td>Master Card</td>
            </tr>

            <tr className="odd">
              <td>iphone 7 plus</td>
              <td>Apple</td>
              <td>Mobile phones</td>
              <td>$700</td>
              <td>Jan 20 ,2020</td>
              <td>Credit Card</td>
            </tr>

            <tr className="odd">
              <td>iphone 7 plus</td>
              <td>Apple</td>
              <td>Mobile phones</td>
              <td>$700</td>
              <td>Jan 20 ,2020</td>
              <td>Credit Card</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <LatestSubscription />
      </div>
    </>
  );
};

export default DashboardTabledata;
