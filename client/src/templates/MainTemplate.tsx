import { Container, Grid } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "../components/common/templates/main/Header";
import { Navbar } from "../components/common/templates/main/Navbar";

export const MainTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxWidth="md">
      <Header />
      <Navbar />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {children}
      </Grid>
    </Container>
  );
};
