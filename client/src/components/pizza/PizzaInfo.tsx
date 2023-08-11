import { Container, Grid, Typography } from "@mui/material";
import { IPizzaWithRelated } from "../../lib/types/IPizza";

export const PizzaInfo = ({ pizza }: { pizza?: IPizzaWithRelated }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="pizzaName">
            {pizza?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" data-testid="pizzaIngredients">
            Ingredients:{" "}
            {pizza?.ingredients.length !== 0
              ? pizza?.ingredients
                  .map((ingredient) => ingredient?.name)
                  .join(", ")
              : " No ingredients"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" data-testid="pizzaOperations">
            Operations:{" "}
            {pizza?.operations.length !== 0
              ? pizza?.operations.map((operation) => operation?.name).join(", ")
              : " No operations"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
