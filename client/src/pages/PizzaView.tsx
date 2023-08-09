import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { PizzaInfo } from "../components/pizza/PizzaInfo";
import { ViewElement } from "../components/common/ViewElement";
import { BackButton } from "../components/common/buttons/BackButton";

export const PizzaView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const params = useParams();

  const pizzaId = params.pizzaId;

  const isLoading = false;
  const isError = false;

  //pobieranie jednej pizzki

  const pizza = {
    name: "Margarita",
    price: 23,
    ingredients: ["cheese", "tomato"],
    operations: ["add", "remove"],
  };

  return (
    <MainTemplate>
      <Grid item>
        <BackButton itemsName="pizzas" />
      </Grid>
      <Grid item>
        <ViewElement isLoading={isLoading} isError={isError}>
          <PizzaInfo pizza={pizza} />
        </ViewElement>
      </Grid>
    </MainTemplate>
  );
};
