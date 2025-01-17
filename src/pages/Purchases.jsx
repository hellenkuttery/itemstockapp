import React from "react";
import useStockCall from "../hook/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PurchasesModal from "./../components/Modals/PurchasesModal";
import { useState } from "react";
import PurchaseTable from "./../components/Table/PurchaseTable";

const Purchases = () => {
  const { getStockData,getFirmBrandProduct } = useStockCall();
  // Lifting state up işlemi yapıldı.Modaldaki stateler purchases sayfasına alındı
  const { purchases } = useSelector((state) => state.stock);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({ firmId:"", brandId:"", productId: "", quantity: "",
      price: "" });
  };
  const [initialState, setInitialState] = useState({
    firmId:"", brandId:"", productId: "", quantity: "",
    price: ""
  });
  useEffect(() => {
    // getStockData("purchases");
    // getStockData("brands");
    // getStockData("categories");
    getFirmBrandProduct()
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ color: "red", marginBottom: "1rem" }}>
        Purchases
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
        New Purchases
      </Button>
      {open && (
        <PurchasesModal
          open={open}
          handleClose={handleClose}
          initialState={initialState}
        />
      )}
      <PurchaseTable setInitialState={setInitialState} handleOpen={handleOpen} />
    </div>
  );
};

export default Purchases;
