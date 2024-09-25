import React from "react";

const LatestSubscription = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <h4 className="col-md-6">Latest Subscriptions</h4>
          <div className="col-md-6">
            <button
              href="#"
              className="btn btn-primary btnn"
              id="new_subscription_main"
            >
              New Subscription +
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3 cardborder" id="form-div">
        <table className="table">
          <thead>
            <tr className="lightblue">
              <th>Software Name</th>
              <th>Plan</th>
              <th>Billing Period</th>
              <th>Amount</th>
              <th>First Payment</th>
              <th>Payment Method</th>
            </tr>
          </thead>

          <tbody>
            <tr className="odd">
              <td>Zoho</td>
              <td>Primium</td>
              <td>After 01 Month</td>
              <td>$700</td>
              <td>Jan 20 ,2020</td>
              <td>Credit Card</td>
            </tr>

            <tr className="odd">
              <td>Amozon</td>
              <td>Basic</td>
              <td>After 01 Month</td>
              <td>$3,500</td>
              <td>Dec 13,2019</td>
              <td>debit Card</td>
            </tr>

            <tr className="odd">
              <td>Amazon prime</td>
              <td>Standard</td>
              <td>After 03 Months</td>
              <td>$4,860</td>
              <td>Oct 8,2020</td>
              <td>Master Card</td>
            </tr>

            <tr role="row" className="odd">
              <td>Amazon Prime</td>
              <td>Basic</td>
              <td>After 02 weeks</td>
              <td>$700</td>
              <td>Jan 20 ,2020</td>
              <td>Credit Card</td>
            </tr>

            <tr role="row" className="odd">
              <td>Netflex</td>
              <td>Premium</td>
              <td>After 01 year</td>
              <td>$700</td>
              <td>Jan 20 ,2020</td>
              <td>Credit Card</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LatestSubscription;
