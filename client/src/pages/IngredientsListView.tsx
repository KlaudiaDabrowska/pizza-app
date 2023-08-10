import { MainTemplate } from "../templates/MainTemplate";
import { IngredientsList } from "../components/ingredient/IngredientsList";

export const IngredientsListView = () => {
  return (
    <MainTemplate>
      <IngredientsList />
    </MainTemplate>
  );
};
