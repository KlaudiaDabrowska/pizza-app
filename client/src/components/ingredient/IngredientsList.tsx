import { Grid } from "@mui/material";
import { ListItem } from "../common/ListItem";

export const IngredientsList = () => {
  //pobieranie składników
  const ingredients = [
    {
      _id: "64d25e560c4ba1b739845fd6",
      name: "sól",
      __v: 0,
    },
    {
      _id: "64d25e7328cb5586ab69829c",
      name: "mąka",
      __v: 0,
    },
    {
      _id: "64d25e7ada96ef7df687e72f",
      name: "cukier",
      __v: 0,
    },
  ];

  return (
    // ingredients list
    <>
      {ingredients.map((ingredient) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListItem item={ingredient} itemName="ingredient" />
        </Grid>
      ))}
    </>
  );
};
