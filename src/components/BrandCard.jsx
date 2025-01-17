import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import useStockCall from "../hook/useStockCall";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function BrandCard({_id,name,phone,address,image, handleOpen,setInitialState }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  /* -------------------------------------------------------------------------- */
  const { getDeleteData } = useStockCall();
  /* -------------------------------------------------------------------------- */

  return (
    <Card
      sx={{
        minWidth:340,
        maxWidth: 345,
        height: 420, // Kart yüksekliği sabit
        display: "flex",
        flexDirection: "column", // İçerikleri dikeyde hizala
        justifyContent: "space-between", // Kartın altındaki ikonları sabit tut
        marginBottom: "1rem",
        marginRight: "1rem",
        boxShadow: "1 0 5px gray",
      }}
    >
      <CardHeader
        title={name}
        subheader={address}
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3, // Maksimum 3 satır göster
          overflow: "hidden", // Fazlalıkları gizle
        }}
      />
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt="Paella dish"
        sx={{ padding: "2rem", objectFit: "scale-down" }}
      />
      <CardContent
        sx={{
          flexGrow: 1, // Kartların içerik alanlarını eşit boyutta yap
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          {phone}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => getDeleteData("brands",_id)}
        >
          <DeleteOutlineIcon
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          />
        </IconButton>
        <IconButton aria-label="share" onClick={()=>{handleOpen(); setInitialState({_id,name,image}) }}     >
          <EditIcon
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
