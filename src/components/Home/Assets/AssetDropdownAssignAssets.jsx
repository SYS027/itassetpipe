import React from "react";

function AssetDropdown({ assetName, selectedAssetId, setSelectedAssetId }) {
  return (
    <div className="col-md-3">
      <label htmlFor="#">Asset name</label>
      <br />
      <select
        className="form-control"
        value={selectedAssetId}
        onChange={(e) =>
          setSelectedAssetId(parseInt(e.target.value, 10))
        }
      >
        <option value="">--Choose an Asset--</option>

        {Array.isArray(assetName) ? (
          assetName.map((assetName) => (
            <option key={assetName.id} value={assetName.id}>
              {assetName.asset_name}
            </option>
          ))
        ) : (
          <p>no data found</p>
        )}
      </select>
    </div>
  );
}

export default AssetDropdown;