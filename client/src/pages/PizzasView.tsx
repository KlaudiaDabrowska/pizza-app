import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { MainTemplate } from "../templates/MainTemplate";

export const PizzasView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MainTemplate>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
          <Paper>Pizzas Element {item}</Paper>
        </Grid>
      ))}
    </MainTemplate>
  );
};
