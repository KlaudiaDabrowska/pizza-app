import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ListItem = ({
  item,
  itemName,
}: {
  item: any;
  itemName: string;
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <Box>
        <CardContent sx={{ flex: "1" }}>
          <Link
            to={`/${itemName}/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h5">{item.name}</Typography>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};
