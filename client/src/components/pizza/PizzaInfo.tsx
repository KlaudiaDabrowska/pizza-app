import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const PizzaInfo = ({ pizza }: { pizza?: any }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="streamerName">
            pizza
          </Typography>
          <Typography variant="subtitle2" data-testid="platform">
            pizza
          </Typography>
        </Grid>
        <Grid item xs={12}>
          pizza
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="description">
            pizza
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
