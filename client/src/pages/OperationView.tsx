import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { ViewElement } from "../components/common/ViewElement";
import { BackButton } from "../components/common/buttons/BackButton";
import { OperationInfo } from "../components/operation/OperationInfo";

export const OperationView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const params = useParams();

  const operationId = params.pizzaId;

  const isLoading = false;
  const isError = false;

  //pobieranie jednej operacji

  const operation = {
    _id: "64d25e7ada96ef7df687e72f",
    name: "smażenie",
    __v: 0,
  };

  return (
    <MainTemplate>
      <Grid item>
        <BackButton itemsName="operations" />
      </Grid>
      <Grid item>
        <ViewElement isLoading={isLoading} isError={isError}>
          <OperationInfo operation={operation} />
        </ViewElement>
      </Grid>
    </MainTemplate>
  );
};
