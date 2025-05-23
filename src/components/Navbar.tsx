import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: green[700] }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          Food Wastage Reduction
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/donations" color="inherit">
            Donations
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
