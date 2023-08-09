import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const OperationInfo = ({ operation }: { operation?: any }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="streamerName">
            operation
          </Typography>
          <Typography variant="subtitle2" data-testid="platform">
            operation
          </Typography>
        </Grid>

        <Grid item xs={12}>
          operation
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="description">
            operation
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
