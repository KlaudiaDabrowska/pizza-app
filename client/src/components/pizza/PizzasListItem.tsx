import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IPizza } from "../../lib/types/IPizza";

export const PizzasListItem = ({ pizza }: { pizza: IPizza }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <Box>
        <CardContent
          sx={{
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Link to={`/pizza/${pizza._id}`} style={{ textDecoration: "none" }}>
            <Typography variant="h5">{pizza.name}</Typography>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Price: {pizza.price}
            </Typography>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};
