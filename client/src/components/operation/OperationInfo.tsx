import { Container, Grid, Typography } from "@mui/material";
import { IOperationWithRelated } from "../../types/IOperation";

export const OperationInfo = ({
  operation,
}: {
  operation?: IOperationWithRelated;
}) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{operation?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Ingredients:{" "}
            {operation?.ingredients
              .map((ingredient) => ingredient?.name)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Pizzas: {operation?.pizzas.map((pizza) => pizza?.name).join(", ")}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
