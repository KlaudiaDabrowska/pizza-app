import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const IngredientInfo = ({ ingredient }: { ingredient?: any }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="streamerName">
            ingredient
          </Typography>
          <Typography variant="subtitle2" data-testid="platform">
            ingredient
          </Typography>
        </Grid>

        <Grid item xs={12}>
          ingredient
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" data-testid="description">
            ingredient
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
