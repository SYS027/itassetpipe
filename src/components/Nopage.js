import React from "react";

import error from "../components/Assets/err.gif";
const Nopage =()=>{
    
 return(
    <>
     <div style={{display:"flex",justifyContent: "center"}}>
        <img src={error} alt="images" width="60%" height="100%"  />
     </div>
    </>
 )

}
export default  Nopage ;