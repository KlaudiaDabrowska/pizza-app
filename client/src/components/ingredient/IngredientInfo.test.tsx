import { render, screen } from "@testing-library/react";
import { IngredientInfo } from "./IngredientInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { generateMockIngredientResponse } from "../../lib/mocks/generateMockIngredientResponse";

describe("Ingredient Info", () => {
  it("should display information about ingredient", () => {
    const queryClient = new QueryClient();

    const ingredient = generateMockIngredientResponse();

    render(
      <QueryClientProvider client={queryClient}>
        <IngredientInfo ingredient={ingredient} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("ingredientName")).toHaveTextContent(
      ingredient.name
    );
    expect(screen.getByTestId("ingredientOperation")).toHaveTextContent(
      ingredient.operation.name
    );
    expect(screen.getByTestId("ingredientPizzas")).toHaveTextContent(
      ingredient?.pizzas.map((pizza) => pizza?.name).join(", ")
    );
  });
});
