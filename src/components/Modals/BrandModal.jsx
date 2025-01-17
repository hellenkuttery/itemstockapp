import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import useStockCall from "../../hook/useStockCall";
import { useEffect } from "react";

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

export default function BrandModal({ open, handleClose, initialState }) {
  const { postStockData, putStockData } = useStockCall();

  const [info, setInfo] = useState(initialState);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Database info bilgisini gönderme işlemi 
    if (info._id){
      putStockData("brands", info);
    }else{
      postStockData("brands", info);
    }
   
    
  };

  //useEffect didUpdate metodu tarzında çalışması. dependancy arrayde başlangıç değeri verildiğinde güncelleme yapması.
  //  useEffect(()=>{setInfo(initialState)},[initialState])

  return (
    <div>
      {/* Button modalı açıyor.Açma işlemi brands sayfasında NEw Brand yaptığı için burda pasif hale getirdik */}
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
            <TextField
              label="Brand Name"
              variant="outlined"
              type="text"
              name="name"
              onChange={handleChange}
              value={info.name}
            />
         
            <TextField
              label="Image Url"
              variant="outlined"
              type="text"
              name="image"
              onChange={handleChange}
              value={info.image}
            />
            <Button
              type="submit"
              sx={{ backgroundColor: "secondary.main", color: "white", "&:hover":{backgroundColor: "secondary.main",}}}
            >
             {info._id ? "UPDATE" :"ADD FIRM"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
