import { Container, Grid, Typography } from "@mui/material";
import { IIngredientWithRelated } from "../../lib/types/IIngredient";

export const IngredientInfo = ({
  ingredient,
}: {
  ingredient?: IIngredientWithRelated;
}) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{ingredient?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Operation:{" "}
            {ingredient?.operation
              ? ingredient.operation?.name
              : "No operation"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Pizzas:{" "}
            {ingredient?.pizzas.length !== 0
              ? ingredient?.pizzas.map((pizza) => pizza?.name).join(", ")
              : " No pizzas"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
