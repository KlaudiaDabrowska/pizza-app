import { useMediaQuery, useTheme } from "@mui/material";
import { MainTemplate } from "../templates/MainTemplate";
import { OperationsList } from "../components/operation/OperationsList";

export const OperationsListView = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MainTemplate>
      <OperationsList />
    </MainTemplate>
  );
};
