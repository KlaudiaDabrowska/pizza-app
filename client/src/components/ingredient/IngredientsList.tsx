import { Grid, Typography } from "@mui/material";
import { ListItem } from "../common/ListItem";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../common/loadings/LoadingState";
import { getAllIngredients } from "../../api/getAllIngredients";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Direction } from "../../lib/types/Direction";
import { IIngredient } from "../../lib/types/IIngredient";
import { DefaultPagination } from "../common/DefaultPagination";

export const IngredientsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const fieldParam = searchParams.get("field");
  const directionParam = searchParams.get("direction");

  const [page, setPage] = useState(pageParam ? +pageParam : 1);
  const [field, setField] = useState(fieldParam ? fieldParam : "name");
  const [direction, setDirection] = useState(
    directionParam ? (directionParam as Direction) : Direction.DESC
  );

  const { data: ingredients, isLoading } = useQuery(
    ["ingredients", page, field, direction],
    () => getAllIngredients(page, field, direction)
  );

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : ingredients && ingredients.data.length > 0 ? (
        <>
          {ingredients?.data?.map((ingredient: IIngredient) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListItem item={ingredient} itemName="ingredient" />
            </Grid>
          ))}
          <Grid item xs={12}>
            <DefaultPagination
              item={ingredients}
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
            No ingredients available.
          </Typography>
        </Grid>
      )}
    </>
  );
};
