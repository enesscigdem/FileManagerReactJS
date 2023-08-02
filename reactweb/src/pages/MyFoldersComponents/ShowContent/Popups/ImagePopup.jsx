import React from "react";

const ImagePopup = ({ imageUrl, handleClose }) => {
  return (
    <div className="image-popup">
      <span className="close" onClick={handleClose}>
        &times;
      </span>
      <img src={imageUrl} alt="Popup Image" />
    </div>
  );
};

export default ImagePopup;
