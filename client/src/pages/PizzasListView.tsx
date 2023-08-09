import { MainTemplate } from "../templates/MainTemplate";
import { PizzasList } from "../components/pizza/PizzasList";

export const PizzasListView = () => {
  return (
    <MainTemplate>
      <PizzasList />
    </MainTemplate>
  );
};
