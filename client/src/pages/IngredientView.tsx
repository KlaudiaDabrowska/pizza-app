import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { ViewElement } from "../components/common/ViewElement";
import { BackButton } from "../components/common/buttons/BackButton";
import { IngredientInfo } from "../components/ingredient/IngredientInfo";
import { getIngredientById } from "../api/getIngredientById";
import { useQuery } from "@tanstack/react-query";

export const IngredientView = () => {
  const params = useParams();

  const ingredientId = params.ingredientId;

  const {
    data: ingredient,
    isLoading,
    isError,
  } = useQuery(["ingredientInfo"], () => getIngredientById(ingredientId!), {
    enabled: ingredientId !== "undefined",
  });

  return (
    <MainTemplate>
      <Grid item>
        <BackButton itemsName="ingredients" />
      </Grid>
      <Grid item>
        <ViewElement isLoading={isLoading} isError={isError}>
          <IngredientInfo ingredient={ingredient} />
        </ViewElement>
      </Grid>
    </MainTemplate>
  );
};
