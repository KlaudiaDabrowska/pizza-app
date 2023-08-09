import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { ViewElement } from "../components/common/ViewElement";
import { BackButton } from "../components/common/buttons/BackButton";
import { IngredientInfo } from "../components/ingredient/IngredientInfo";

export const IngredientView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const params = useParams();

  const ingredientId = params.pizzaId;

  const isLoading = false;
  const isError = false;

  //pobieranie jednej pizzki

  const ingredient = {
    _id: "64d25e7ada96ef7df687e72f",
    name: "cukier",
    __v: 0,
  };

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
