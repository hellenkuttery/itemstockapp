import React from "react";
import useStockCall from "../hook/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FirmCard from "./../components/FirmCard";
import FirmModal from "./../components/Modals/FirmModal";
import { useState } from "react";

const Firms = () => {
  const { getStockData } = useStockCall();
  // Lifting state up işlemi yapıldı.Modaldaki stateler firms sayfasına alındı
  const { firms } = useSelector((state) => state.stock);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
     setInitialState({ name: "", address: "", phone: "", image: "" });
  };
  const [initialState, setInitialState] = useState({
    name: "",
    address: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    getStockData("firms");
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ color: "red", marginBottom: "1rem" }}>
        Firms
      </Typography>

      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          padding: "0.2rem 1rem",
          marginBottom: "1rem",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        New Firm
      </Button>
      {open && (
        <FirmModal
          open={open}
          handleClose={handleClose}
          initialState={initialState}
        />
      )}
      <Grid container sx={{ marginLeft: "1rem" }}>
        {firms.map((firm, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <FirmCard
              {...firm}
              handleOpen={handleOpen}
              setInitialState={setInitialState}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
