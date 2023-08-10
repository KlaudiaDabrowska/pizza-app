import { Grid, Typography } from "@mui/material";
import { ListItem } from "../common/ListItem";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../common/loadings/LoadingState";
import { getAllPizzas } from "../../api/getAllPizzas";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Direction } from "../../lib/types/Direction";
import { IPizza } from "../../lib/types/IPizza";
import { DefaultPagination } from "../common/DefaultPagination";

export const PizzasList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const fieldParam = searchParams.get("field");
  const directionParam = searchParams.get("direction");

  const [page, setPage] = useState(pageParam ? +pageParam : 1);
  const [field, setField] = useState(fieldParam ? fieldParam : "name");
  const [direction, setDirection] = useState(
    directionParam ? (directionParam as Direction) : Direction.DESC
  );

  const { data: pizzas, isLoading } = useQuery(
    ["pizzas", page, field, direction],
    () => getAllPizzas(page, field, direction)
  );

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : pizzas && pizzas.data.length > 0 ? (
        <>
          {pizzas?.data?.map((pizza: IPizza) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListItem item={pizza} itemName="pizza" />
            </Grid>
          ))}
          <Grid item xs={12}>
            <DefaultPagination
              item={pizzas}
              page={page}
              field={field}
              direction={direction}
              setPage={setPage}
              setSearchParams={setSearchParams}
            />
          </Grid>
        </>
      ) : (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="h5" textAlign="center">
            No pizzas available.
          </Typography>
        </Grid>
      )}
    </>
  );
};
