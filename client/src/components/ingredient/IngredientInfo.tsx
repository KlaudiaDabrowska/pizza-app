import { Container, Grid, Typography } from "@mui/material";
import { IIngredientWithRelated } from "../../types/IIngredient";

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
            Operation: {ingredient?.operation?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Pizzas: {ingredient?.pizzas.map((pizza) => pizza?.name).join(", ")}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
