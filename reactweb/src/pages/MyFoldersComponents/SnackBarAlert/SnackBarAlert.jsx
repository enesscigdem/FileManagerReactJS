import { Snackbar, Slide, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";

const SnackBarAlert = ({ setSuccessMessage, successMessage }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    if (successMessage && !openAlert) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
        setSuccessMessage("");
      }, 2500);
    }
  }, [successMessage, openAlert]);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };
  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={null}
        TransitionComponent={Slide}
        TransitionProps={{
          direction: "right",
        }}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default SnackBarAlert;
