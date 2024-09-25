import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faLocationDot, faChartSimple } from "@fortawesome/free-solid-svg-icons";
const ProfileSecondSection = () => {

    const handleCancel = () => {
        console.log("Cancel button clicked");
    };
    return (
        <>
            <h5 className="cen">
             <b>BASIC INFORMATION</b>
            </h5>
            <hr />
            <div className="first">
                <div className="summarydata">
                    <h6>
                        <FontAwesomeIcon icon={faChartSimple} className="icon" />
                        <b>Summary</b>
                    </h6>
                    <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
                <p>N/A</p>
            </div>
            <div className="second">
                <div className="summarydata">
                    <h6>
                        <FontAwesomeIcon icon={faLocationDot} className="icon" />
                        <b>My Location</b>
                    </h6>
                    <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
                <p>My Location</p>
                <div className="locationclass">
                    <div className="row-container">
                        <select className="form-select">
                            <option value="">---Please Add Some Location---</option>
                            <option>Mumbai</option>
                            <option>Madhya Pradesh</option>
                            <option>Noida</option>
                        </select>
                        <button
                            className="custom-button"
                            onClick={() =>
                                (window.location.href = "/location")
                            }
                        >
                            ADD LOCATION
                        </button>
                    </div>
                    <br />
                    <Link className="button" >
                        Save
                    </Link>
                    <button className="btn btn-primary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}
export default ProfileSecondSection;