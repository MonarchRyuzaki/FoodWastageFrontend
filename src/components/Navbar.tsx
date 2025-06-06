import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
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
          {isAuthenticated ? (
            <>
              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>
              <Button component={Link} to="/logout" color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login?type=donor" color="inherit">
                Login as Donor
              </Button>
              <Button component={Link} to="/login?type=ngo" color="inherit">
                Login as NGO
              </Button>
              <Button component={Link} to="/register/donor" color="inherit">
                Register as Donor
              </Button>
              <Button component={Link} to="/register/ngo" color="inherit">
                Register as NGO
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
