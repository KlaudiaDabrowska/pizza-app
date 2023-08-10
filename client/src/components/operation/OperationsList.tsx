import { Grid, Pagination, Typography } from "@mui/material";
import { ListItem } from "../common/ListItem";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../common/loadings/LoadingState";
import { getAllOperations } from "../../api/getAllOperations";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Direction } from "../../lib/types/Direction";
import { IOperation } from "../../lib/types/IOperation";
import { DefaultPagination } from "../common/DefaultPagination";

export const OperationsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const fieldParam = searchParams.get("field");
  const directionParam = searchParams.get("direction");

  const [page, setPage] = useState(pageParam ? +pageParam : 1);
  const [field, setField] = useState(fieldParam ? fieldParam : "name");
  const [direction, setDirection] = useState(
    directionParam ? (directionParam as Direction) : Direction.DESC
  );

  const { data: operations, isLoading } = useQuery(
    ["operations", page, field, direction],
    () => getAllOperations(page, field, direction)
  );

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : operations && operations.data.length > 0 ? (
        <>
          {operations?.data?.map((operation: IOperation) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListItem item={operation} itemName="operation" />
            </Grid>
          ))}
          <Grid item xs={12}>
            <DefaultPagination
              item={operations}
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
            No operations available.
          </Typography>
        </Grid>
      )}
    </>
  );
};
