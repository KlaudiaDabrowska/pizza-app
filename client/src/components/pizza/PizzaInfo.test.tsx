import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PizzaInfo } from "./PizzaInfo";
import { generateMockPizzaResponse } from "../../lib/mocks/generateMockPizzaResponse";

describe("Pizza Info", () => {
  it("should display information about pizza", () => {
    const queryClient = new QueryClient();

    const pizza = generateMockPizzaResponse();

    render(
      <QueryClientProvider client={queryClient}>
        <PizzaInfo pizza={pizza} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("pizzaName")).toHaveTextContent(pizza.name);
    expect(screen.getByTestId("pizzaIngredients")).toHaveTextContent(
      pizza?.ingredients.map((ingredient) => ingredient?.name).join(", ")
    );
    expect(screen.getByTestId("pizzaOperations")).toHaveTextContent(
      pizza?.operations.map((operation) => operation?.name).join(", ")
    );
  });
});
