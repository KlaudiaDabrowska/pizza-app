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

export const queryClient = new QueryClient();

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
      path: "/pizza/:pizzaId",
      element: <PizzaView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/ingredients",
      element: <IngredientsListView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/ingredient/:ingredientId",
      element: <IngredientView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/operations",
      element: <OperationsListView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/operation/:operationId",
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
