import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AssignListShow = ({ sidebarOpen, match }) => {
  const sampleAssignAsset = {
    asset_table: { asset_name: "Cylsys" },
    vendor: { vendor_name: "Dell Electronics" },
    product_categories: { category_name: "Laptop" },
    product_type: { product_type: "Portable" },
    product: { product: "Dell" },
    address: { address: "Gadarwara" },
    department: { department_name: "IT" },
    employee: { employee: "Rahul" },
    Discription: { Discription: "System assigned" },
    Assign_Component: { Assign_Component: "SYS023" },
  };
  const params = useParams();
  const [assignAsset, setAssignAsset] = useState(sampleAssignAsset);
  

  useEffect(() => {
    const url = `hhttp://127.0.0.1:3001/api/v1/assign_assets/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setAssignAsset(response))
      .catch((error) => console.error("Error fetching data:", error));
  }, [params.id]);

  return (
    <div
      id="main"
      className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
    >
      <section className="section">
        <div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="title">
                <h4>Assign Asset list Details</h4>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <Link to="/assignlist" className="btn btn-dark">
            Back To List
          </Link>
        </div>
        <div className="row mt-3 cardborder">
          <div className="col-md-6">
            <div className="tab">
              <table>
                <tr>
                  <th>Asset Name:</th>
                  <td>{assignAsset.asset_table.asset_name}</td>
                </tr>
                <tr>
                  <th>Vendor Name:</th>
                  <td>{assignAsset.vendor?.vendor_name}</td>
                </tr>
                <tr>
                  <th>Product catogory Name:</th>
                  <td>{assignAsset.product_categories?.category_name}</td>
                </tr>
                <tr>
                  <th>Product Type:</th>
                  <td>{assignAsset.product_type?.product_type}</td>
                </tr>
                <tr>
                  <th>Product:</th>
                  <td>{assignAsset.product?.product}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="col-md-6">
            <div className="tab">
              <table>
                <tr>
                  <th>Address</th>
                  <td>{assignAsset.address?.address}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{assignAsset.department?.department_name}</td>
                </tr>
                <tr>
                  <th>Assign To</th>
                  <td>{assignAsset.employee?.employee}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{assignAsset.Discription?.Discription}</td>
                </tr>
                <tr>
                  <th>Assign Component</th>
                  <td>{assignAsset.Assign_Component?.Assign_Component}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignListShow;
