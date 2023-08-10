import { Grid, Typography } from "@mui/material";
import { ListItem } from "../common/ListItem";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../common/loadings/LoadingState";
import { getAllIngredients } from "../../api/getAllIngredients";
import { getAllOperations } from "../../api/getAllOperations";
import { getAllPizzas } from "../../api/getAllPizzas";

export const List = ({ itemName }: { itemName: string }) => {
  const queryKey = `queryKey-${itemName}`;

  const { data, isLoading } = useQuery([queryKey], () => {
    switch (itemName) {
      case "pizza":
        return getAllPizzas();
      case "ingredient":
        return getAllIngredients();
      case "operation":
        return getAllOperations();
      default:
        return [];
    }
  });

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : data && data.length > 0 ? (
        data?.map((dataItem: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ListItem item={dataItem} itemName={itemName} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="h5" textAlign="center">
            No {itemName}s available.
          </Typography>
        </Grid>
      )}
    </>
  );
};
