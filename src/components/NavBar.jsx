import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../images/REIZ.gif";
import { Box } from "@mui/material";

function NavBar() {
  return (
    <AppBar position="static" sx={{ borderRadius: 3, my: 1 }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", justifyContent: "center" }}
          disableGutters
        >
          <Box
            component={"img"}
            src={Logo}
            sx={{ height: "50px", width: "auto", borderRadius: 3, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Countries API
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
