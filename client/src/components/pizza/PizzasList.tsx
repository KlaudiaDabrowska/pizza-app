import { Grid } from "@mui/material";
import { ListItem } from "../common/ListItem";

export const PizzasList = () => {
  //zamienić na jeden wspólny komponent? i w zależności czy pizzka czy ingredient czy operacja to pobierać
  //pobieranie pizzek
  const pizzas = [
    {
      ingredients: [],
      _id: "64d25e560c4ba1b739845fd6",
      price: 230,
      name: "Margarita",
      __v: 0,
    },
    {
      ingredients: [],
      _id: "64d25e7328cb5586ab69829c",
      price: 234,
      name: "Hawajska",
      __v: 0,
    },
    {
      ingredients: [],
      _id: "64d25e7ada96ef7df687e72f",
      price: 23333,
      name: "Pepperoni",
      __v: 0,
    },
  ];

  return (
    // pizzas list
    <>
      {pizzas.map((pizza) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListItem item={pizza} itemName="pizza" />
        </Grid>
      ))}
    </>
  );
};
