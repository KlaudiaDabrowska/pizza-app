import { MainTemplate } from "../templates/MainTemplate";
import { List } from "../components/common/List";

export const PizzasListView = () => {
  return (
    <MainTemplate>
      <List itemName="pizza" />
    </MainTemplate>
  );
};
