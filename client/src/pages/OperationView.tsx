import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainTemplate } from "../templates/MainTemplate";
import { ViewElement } from "../components/common/ViewElement";
import { BackButton } from "../components/common/buttons/BackButton";
import { OperationInfo } from "../components/operation/OperationInfo";
import { getOperationById } from "../api/getOperationById";
import { useQuery } from "@tanstack/react-query";

export const OperationView = () => {
  const params = useParams();

  const operationId = params.operationId;

  const {
    data: operation,
    isLoading,
    isError,
  } = useQuery(["operationInfo"], () => getOperationById(operationId!), {
    enabled: operationId !== "undefined",
  });

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
