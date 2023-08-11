import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OperationInfo } from "./OperationInfo";
import { generateMockOperationResponse } from "../../lib/mocks/generateMockOperationResponse";

describe("Operation Info", () => {
  it("should display information about operation", () => {
    const queryClient = new QueryClient();

    const operation = generateMockOperationResponse();

    render(
      <QueryClientProvider client={queryClient}>
        <OperationInfo operation={operation} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("operationName")).toHaveTextContent(
      operation.name
    );
    expect(screen.getByTestId("operationIngredients")).toHaveTextContent(
      operation?.ingredients.map((ingredient) => ingredient?.name).join(", ")
    );
    expect(screen.getByTestId("operationPizzas")).toHaveTextContent(
      operation?.pizzas.map((pizza) => pizza?.name).join(", ")
    );
  });
});
