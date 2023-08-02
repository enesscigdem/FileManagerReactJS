import React from "react";

const VideoPopup = ({ videoUrl, handleClose }) => {
  return (
    <div className="video-popup">
      <span className="close" onClick={handleClose}>
        &times;
      </span>
      <video controls width="100%" height="auto">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPopup;
