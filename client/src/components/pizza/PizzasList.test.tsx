import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import { generateMockPizzasResponse } from "../../lib/mocks/generateMockPizzasResponse";
import { PizzasList } from "./PizzasList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const server = setupServer();

describe("Pizzas List", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should render pizzas list", () => {
    const pizzasResponse = generateMockPizzasResponse();

    server.use(
      rest.get("http://localhost:1234/pizzas", (req, res, ctx) => {
        return res(ctx.json(pizzasResponse));
      })
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: "/pizzas" }]}>
        <QueryClientProvider client={queryClient}>
          <PizzasList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    pizzasResponse.data.forEach(async (pizza) => {
      expect(await screen.findByText(pizza.name)).toBeInTheDocument();
    });
  });
});
