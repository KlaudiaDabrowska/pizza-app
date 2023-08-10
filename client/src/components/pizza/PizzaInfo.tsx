import { Container, Grid, Typography } from "@mui/material";
import { IPizzaWithRelated } from "../../types/IPizza";

export const PizzaInfo = ({ pizza }: { pizza?: IPizzaWithRelated }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{pizza?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Ingredients:{" "}
            {pizza?.ingredients
              .map((ingredient) => ingredient?.name)
              .join(", ")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Operations:{" "}
            {pizza?.operations.map((operation) => operation?.name).join(", ")}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
