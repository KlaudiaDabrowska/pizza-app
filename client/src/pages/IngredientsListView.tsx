import { MainTemplate } from "../templates/MainTemplate";
import { List } from "../components/common/List";

export const IngredientsListView = () => {
  return (
    <MainTemplate>
      <List itemName="ingredient" />
    </MainTemplate>
  );
};
