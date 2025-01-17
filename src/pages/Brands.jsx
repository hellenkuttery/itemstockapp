import React from "react";
import useStockCall from "../hook/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BrandCard from "../components/BrandCard";
import BrandModal from "./../components/Modals/BrandModal";
import { useState } from "react";

const Brands = () => {
  const { getStockData } = useStockCall();
  // Lifting state up işlemi yapıldı.Modaldaki stateler brands sayfasına alındı
  const { brands } = useSelector((state) => state.stock);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({ name: "",  image: "" });
  };
  const [initialState, setInitialState] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    getStockData("brands");
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ color: "red", marginBottom: "1rem" }}>
        Brands
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
        New Brand
      </Button>
      {open && (
        <BrandModal
          open={open}
          handleClose={handleClose}
          initialState={initialState}
        />
      )}
      <Grid container sx={{ marginLeft: "1rem" }}>
        {brands.map((brand, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <BrandCard
              {...brand}
              handleOpen={handleOpen}
              setInitialState={setInitialState}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brands;
