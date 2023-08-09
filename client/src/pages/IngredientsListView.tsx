import { useMediaQuery, useTheme } from "@mui/material";
import { MainTemplate } from "../templates/MainTemplate";
import { IngredientsList } from "../components/ingredient/IngredientsList";

export const IngredientsListView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MainTemplate>
      <IngredientsList />
    </MainTemplate>
  );
};
