import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ErrorBoundary } from "./components/common/errors/ErrorBoundary";
import { theme } from "./styles/theme";
import { NotFound } from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PizzasListView } from "./pages/PizzasListView";
import { IngredientsListView } from "./pages/IngredientsListView";
import { OperationsListView } from "./pages/OperationsListView";
import { PizzaView } from "./pages/PizzaView";
import { IngredientView } from "./pages/IngredientView";
import { OperationView } from "./pages/OperationView";
import { isAxiosError } from "axios";

const MAX_RETRIES = 3;
const RETRYABLE_ERRORS = [500, 502, 503, 504];

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (
          isAxiosError(error) &&
          RETRYABLE_ERRORS.includes(error.response?.status ?? 0) &&
          failureCount <= MAX_RETRIES
        ) {
          return true;
        }

        return false;
      },
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/pizzas" replace />,
    },
    {
      path: "/pizzas",
      element: <PizzasListView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/pizzas/:pizzaId",
      element: <PizzaView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/ingredients",
      element: <IngredientsListView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/ingredients/:ingredientId",
      element: <IngredientView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/operations",
      element: <OperationsListView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/operations/:operationId",
      element: <OperationView />,
      errorElement: <ErrorBoundary />,
    },
    { path: "*", element: <NotFound />, errorElement: <ErrorBoundary /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
