import { Grid } from "@mui/material";
import { ListItem } from "../common/ListItem";

export const OperationsList = () => {
  //zamienić na jeden wspólny komponent? i w zależności czy pizzka czy ingredient czy operacja to pobierać
  //pobieranie operacji
  const operations = [
    {
      _id: "64d25e560c4ba1b739845fd6",
      name: "krojenie",
      __v: 0,
    },
    {
      _id: "64d25e7328cb5586ab69829c",
      name: "smażenie",
      __v: 0,
    },
    {
      _id: "64d25e7ada96ef7df687e72f",
      name: "pieczenie",
      __v: 0,
    },
  ];

  return (
    // pizzas list
    <>
      {operations.map((operation) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListItem item={operation} itemName="operation" />
        </Grid>
      ))}
    </>
  );
};
