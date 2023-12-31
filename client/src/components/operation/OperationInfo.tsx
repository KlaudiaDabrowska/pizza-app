import { Container, Grid, Typography } from "@mui/material";
import { IOperationWithRelated } from "../../lib/types/IOperation";

export const OperationInfo = ({
  operation,
}: {
  operation?: IOperationWithRelated;
}) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="operationName">
            {operation?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" data-testid="operationIngredients">
            Ingredients:{" "}
            {operation?.ingredients.length !== 0
              ? operation?.ingredients
                  .map((ingredient) => ingredient?.name)
                  .join(", ")
              : " No ingredients"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" data-testid="operationPizzas">
            Pizzas:{" "}
            {operation?.pizzas.length !== 0
              ? operation?.pizzas.map((pizza) => pizza?.name).join(", ")
              : " No pizzas"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
