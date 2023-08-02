import React from "react";

const PdfPopup = ({ pdfUrl, handleClose }) => {
  return (
    <div className="pdf-popup">
      <span className="close" onClick={handleClose}>
        &times;
      </span>
      <object
        data={pdfUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        marginTop="10%"
      >
        <p>PDF viewer is not supported by your browser.</p>
      </object>
    </div>
  );
};

export default PdfPopup;
