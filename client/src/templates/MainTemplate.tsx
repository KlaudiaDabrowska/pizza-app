import { Container, Grid } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "../components/common/Header";
import { Navbar } from "../components/common/Navbar";

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
