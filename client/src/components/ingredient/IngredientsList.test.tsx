import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IngredientsList } from "./IngredientsList";
import { generateMockIngredientsResponse } from "../../lib/mocks/generateMockIngredientsResponse";

const queryClient = new QueryClient();

const server = setupServer();

describe("Ingredients List", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should render ingredients list", () => {
    const ingredientsResponse = generateMockIngredientsResponse();

    server.use(
      rest.get("http://localhost:1234/ingredients", (req, res, ctx) => {
        return res(ctx.json(ingredientsResponse));
      })
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: "/ingredients" }]}>
        <QueryClientProvider client={queryClient}>
          <IngredientsList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    ingredientsResponse.data.forEach(async (ingredient) => {
      expect(await screen.findByText(ingredient.name)).toBeInTheDocument();
    });
  });
});
