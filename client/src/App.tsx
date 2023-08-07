import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { theme } from "./styles/theme";
import { NotFound } from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PizzasView } from "./pages/PizzasView";
import { IngredientsView } from "./pages/IngredientsView";
import { OperationsView } from "./pages/OperationsView";

export const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/pizzas" replace />,
    },
    {
      path: "/pizzas",
      element: <PizzasView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/ingredients",
      element: <IngredientsView />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/operations",
      element: <OperationsView />,
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
