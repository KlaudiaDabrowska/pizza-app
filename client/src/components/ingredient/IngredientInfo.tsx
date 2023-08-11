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
          <Typography variant="h5" data-testid="ingredientName">
            {ingredient?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" data-testid="ingredientOperation">
            Operation:{" "}
            {ingredient?.operation
              ? ingredient.operation?.name
              : "No operation"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" data-testid="ingredientPizzas">
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
