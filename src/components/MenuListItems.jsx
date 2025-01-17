import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const icon = (name) => `public/assets/navbar/${name}.svg`;

const links = [
    {
      title: "Dashboard",
      url: "/stock",
      // icon:"/assets/navbar/ic_analytics.svg",
      icon: icon("ic_analytics"),
    },
    {
      title: "Firms",
      url: "/stock/firms",
      icon: icon("firms"),
    },
    {
      title: "Brands",
      url: "/stock/brands",
      icon: icon("brand"),
    },
    {
      title: "Purchases",
      url: "/stock/purchases",
      icon: icon("purchase"),
    },
    {
      title: "Sales",
      url: "/stock/sales",
      icon: icon("sales"),
    },
    {
      title: "Products",
      url: "/stock/products",
      icon: icon("ic_cart"),
    },
  ];
  

const MenuListItems = () => {

    const navigate=useNavigate()
    const location=useLocation()


const btnStyle={
    color:"secondary.main",
    borderRadius:"1rem",
    transition:"all 0.7s ease-in",
    "&:hover":{
        backgroundColor:"secondary.main",
        color:"white"
    }}
const selectedStyle={
    backgroundColor:"secondary.main",
    color:"white",
    borderRadius:"1rem",
    transition:"all 0.2s ease-in-out",
    "&:hover":{
        backgroundColor:"secondary.main",
        color:"white"
    }}

  return (
    <div>
      <Toolbar />
      <List>
        {links.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={()=>navigate(item.url)}              
            sx={ item.url === location.pathname ? selectedStyle : btnStyle  }
            >
                <Box sx={{
                    width:"24px",
                    height:"24px",
                    mask:`url(${item.icon}) no-repeat center/contain`,
                    bgcolor:"currentColor",
                    mr:2
                }}  ></Box>
                {/* <Box sx={{
                    width:"24px",
                    height:"24px",
                    backgroundImage:`url(${item.icon})`,
                    backgroundSize:"contain",
                    backgroundRepeat:"no-repeat",
                    mr:2,
                    backgroundColor:"red",                    
                }}  ></Box> */}
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListItems;
