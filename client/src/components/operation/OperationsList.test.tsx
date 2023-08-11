import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { generateMockOperationsResponse } from "../../lib/mocks/generateMockOperationsResponse";
import { OperationsList } from "./OperationsList";

const queryClient = new QueryClient();

const server = setupServer();

describe("Operations List", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should render operations list", () => {
    const operationsResponse = generateMockOperationsResponse();

    server.use(
      rest.get("http://localhost:1234/operations", (req, res, ctx) => {
        return res(ctx.json(operationsResponse));
      })
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: "/operations" }]}>
        <QueryClientProvider client={queryClient}>
          <OperationsList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    operationsResponse.data.forEach(async (operation) => {
      expect(await screen.findByText(operation.name)).toBeInTheDocument();
    });
  });
});
