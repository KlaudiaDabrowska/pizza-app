import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { LoadingState } from "./loadings/LoadingState";
import { ErrorInfo } from "./errors/ErrorInfo";
import { ReactNode } from "react";

export const ViewElement = ({
  isLoading,
  isError,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
}) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: "center",
        width: isSmallScreen ? 300 : 800,
      }}
    >
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorInfo error="Ooops. Something went wrong. Please try again later." />
      ) : (
        children
      )}
    </Paper>
  );
};
