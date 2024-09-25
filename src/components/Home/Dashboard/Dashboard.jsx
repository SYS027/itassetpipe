import React, { useState, useEffect } from "react";
import DashboardTabledata from "./DashboardTabledata";
import axios from "axios";
import Graph from "../Graph/Graph"; // Assuming a separate component for the Chart
import "./Dashboard.css";
import div1 from "../../Assets/div1.png";
import div2 from "../../Assets/div2.png";
import div3 from "../../Assets/div3.png";
import div4 from "../../Assets/div4.png";

const Dashboard = ({ sidebarOpen }) => {
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);
  const [totalCostAsset, setTotalCostAsset] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await axios.get(url);
      setDataFunction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataForGraph = async () => {
      try {
        const vendorsResponse = await axios.get("http://127.0.0.1:3001/api/v1/total_vendors");
        const employeesResponse = await axios.get("http://127.0.0.1:3001/api/v1/total_employees");
        const assetsResponse = await axios.get("http://127.0.0.1:3001/api/v1/total_assets");
        const costAssetsResponse = await axios.get("http://127.0.0.1:3001/api/v1/totalcost_assets");

        setTotalVendors(vendorsResponse.data);
        setTotalEmployee(employeesResponse.data);
        setTotalAsset(assetsResponse.data);
        setTotalCostAsset(costAssetsResponse.data);

        const formattedGraphData = processDataForGraph(
          vendorsResponse.data,
          employeesResponse.data,
          assetsResponse.data,
          costAssetsResponse.data
        );
        setGraphData(formattedGraphData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchDataForGraph();
  }, []);

  const processDataForGraph = (vendors, employees, assets, costAssets) => {
    const processedData = [
      { x: vendors, y: employees },
      { x: assets, y: costAssets },
      // Add more data points as needed based on your requirements
    ];

    return processedData;
  };

  return (
    <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
      <div className="card" id="card_main">
        <section className="section-main">
          <div className="">
            <div className="title">
              <h3>
                <b>Dashboard</b>
              </h3>
            </div>
          </div>
          <hr />

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12" id="loc">
                <center>
                  <p>
                    Your default Location is not updated
                    <b> <a href="/profile" id="loc1"> Click here </a> </b>
                    to choose your default Location. <br />
                    <b>Note</b>:- You can add &amp; set default Location from Admin &gt; Locations section as well.
                  </p>
                </center>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                <div className="card text-center" id="card_row1">
                  <div className="card-body">
                    <h4 className="card-title text-light">Total Asset Cost</h4>
                    <center>
                      <h4 className="card-title text-light">
                        {totalCostAsset}
                      </h4>
                    </center>
                    <img src={div1} alt="" className="divimgdashboard" />
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-12">
                <div className="card text-center" id="card_row2">
                  <div className="card-body">
                    <h4 className="card-title text-light">Total Assets</h4>
                    <center> <h4 className="card-title text-light">{totalAsset}</h4> </center>
                    <img src={div2} alt="" className="divimgdashboard" />
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-12">
                <div className="card text-center" id="card_row3">
                  <div className="card-body">
                    <h4 className="card-title text-light">Total Vendors</h4>
                    <center>
                      <h4 className="card-title text-light">{totalVendors}</h4>
                    </center>
                    <img src={div3} alt="" className="div3imgdashboard" />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card text-center" id="card_row4">
                  <div className="card-body">
                    <h4 className="card-title text-light">Total Employee</h4>
                    <center>
                      <h4 className="card-title text-light">{totalEmployee}</h4>
                    </center>
                    <img src={div4} alt="" className="divimgdashboard" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Graph chartData={graphData} />
            </div>

            <div className="mt-5">
              <DashboardTabledata />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
