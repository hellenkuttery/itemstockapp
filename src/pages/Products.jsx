import React from "react";
import useStockCall from "../hook/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProductsModal from "./../components/Modals/ProductsModal";
import { useState } from "react";
import ProductTable from "./../components/Table/ProductTable";

const Products = () => {
  const { getStockData,getProductCatBrand } = useStockCall();
  // Lifting state up işlemi yapıldı.Modaldaki stateler products sayfasına alındı
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({ categoryId:"", brandId:"", name: "" });
  };
  const [initialState, setInitialState] = useState({
    categoryId:"", brandId:"", name: "" 
  });
  useEffect(() => {
    // getStockData("products");
    // getStockData("brands");
    // getStockData("categories");
    getProductCatBrand()
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ color: "red", marginBottom: "1rem" }}>
        Products
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
        New Products
      </Button>
      {open && (
        <ProductsModal
          open={open}
          handleClose={handleClose}
          initialState={initialState}
        />
      )}
      <ProductTable />
    </div>
  );
};

export default Products;
