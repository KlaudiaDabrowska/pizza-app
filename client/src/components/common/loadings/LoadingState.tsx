import { CircularProgress, Grid } from "@mui/material";

export const LoadingState = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} m={5} textAlign="center">
      <CircularProgress color="secondary" />
    </Grid>
  );
};
