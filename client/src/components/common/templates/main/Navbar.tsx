import { Box, Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const tabs = [
    {
      label: "Pizzas",
      path: "/pizzas",
      isActive: location.pathname.includes("pizzas"),
    },
    {
      label: "Ingredients",
      path: "/ingredients",
      isActive: location.pathname.includes("ingredients"),
    },
    {
      label: "Operations",
      path: "/operations",
      isActive: location.pathname.includes("operations"),
    },
  ];

  return (
    <Box justifyContent="center" alignItems="center" display="flex">
      <Tabs>
        {tabs.map((tab) => (
          <Tab
            label={tab.label}
            component={Link}
            to={tab.path}
            sx={{
              borderBottom: tab.isActive ? "2px solid #2EC4B6" : "none",
              fontWeight: tab.isActive ? "bolder" : "none",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
