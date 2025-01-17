import React from "react";
import useStockCall from "../hook/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SalesModal from "./../components/Modals/SalesModal";
import { useState } from "react";
import SaleTable from "./../components/Table/SaleTable";

const Sales = () => {
  const { getPurcSales } = useStockCall();
  // Lifting state up işlemi yapıldı.Modaldaki stateler sales sayfasına alındı
  const { sales } = useSelector((state) => state.stock);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({  brandId: "",
      productId: "",
      quantity: "",
      price: "", });
  };
  const [initialState, setInitialState] = useState({
    brandId: "",
    productId: "",
    quantity: "",
    price: "",
  });
  useEffect(() => {
    // getStockData("sales");
    // getStockData("brands");
    // getStockData("categories");
    getPurcSales()
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ color: "red", marginBottom: "1rem" }}>
        Sales
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
        New Sales
      </Button>
      {open && (
        <SalesModal
          open={open}
          handleClose={handleClose}
          initialState={initialState}
        />
      )}
      <SaleTable setInitialState={setInitialState} handleOpen={handleOpen} />
    </div>
  );
};

export default Sales;
