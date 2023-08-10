import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { PizzaInfo } from "../components/pizza/PizzaInfo";
import { ViewElement } from "../components/common/ViewElement";
import { BackButton } from "../components/common/buttons/BackButton";
import { getPizzaById } from "../api/getPizzaById";
import { useQuery } from "@tanstack/react-query";

export const PizzaView = () => {
  const params = useParams();

  const pizzaId = params.pizzaId;

  const {
    data: pizza,
    isLoading,
    isError,
  } = useQuery(["pizzaInfo"], () => getPizzaById(pizzaId!), {
    enabled: pizzaId !== "undefined",
  });

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
