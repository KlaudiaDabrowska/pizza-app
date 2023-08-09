import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = ({ itemsName }: { itemsName: string }) => {
  return (
    <Link to={`/${itemsName}`} style={{ textDecoration: "none" }}>
      <IconButton>
        <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle2">
          Back to the list of {itemsName}
        </Typography>
      </IconButton>
    </Link>
  );
};
