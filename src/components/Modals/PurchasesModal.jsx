import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import useStockCall from "../../hook/useStockCall";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PurchasesModal({ open, handleClose, initialState }) {
  const { postStockData, putStockData, getStockData } = useStockCall();

  const [info, setInfo] = useState(initialState);

  const handleChange = (e) => {
   
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Database info bilgisini gönderme işlemi
    if (info._id) {
      putStockData("purchases", info);
    } else {
      postStockData("purchases", info);
    }

    handleClose();
  };

  const { brands, firms, products } = useSelector((state) => state.stock);


  //useEffect didUpdate metodu tarzında çalışması. dependancy arrayde başlangıç değeri verildiğinde güncelleme yapması.
  //  useEffect(()=>{setInfo(initialState)},[initialState])

  return (
    <div>
      {/* Button modalı açıyor.Açma işlemi firms sayfasında NEw Firm yaptığı için burda pasif hale getirdik */}
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Firm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info?.firmId?._id || info?.firmId || ""}
                label="Firm"
                name="firmId"
                onChange={handleChange}
              >
                {firms.map((firm, index) => (
                  <MenuItem key={index} value={firm._id}>
                    {firm.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info?.brandId?._id || info?.brandId || ""}
                label="Brand"
                name="brandId"
                onChange={handleChange}
              >
                {brands.map((brand, index) => (
                  <MenuItem key={index} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={info?.productId?._id || info?.productId || ""}
                label="Product"
                name="productId"
                onChange={handleChange}
              >
                {products.map((product, index) => (
                  <MenuItem key={index} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Quantity"
              id="quantity"
              name="quantity"
              type="number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              id="price"
              type="number"
              variant="outlined"
              name="price"
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.price}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
                "&:hover": { backgroundColor: "secondary.main" },
              }}
            >
              {info._id ? "UPDATE" : "ADD FIRM"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
