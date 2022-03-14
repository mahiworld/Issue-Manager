import React from "react";
import "./Popup.css";

const Popup = props => {
  console.log(props)
  return (
    <div className="popup-box">
      <div className="box">
        <div className="CloseBtn">
          <button onClick={props.handleClose}>X</button> 
        </div>
        <div className="title">
             <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="footer">
          <button id="cancelBtn" onClick={props.handleClose}>Cancel</button>
          <button onClick={props.handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Popup;