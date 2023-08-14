import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IIngredient } from "../../lib/types/IIngredient";

export const IngredientsListItem = ({
  ingredient,
}: {
  ingredient: IIngredient;
}) => {
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
          <Link
            to={`/ingredients/${ingredient._id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h5">{ingredient.name}</Typography>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};
