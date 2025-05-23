import { Box, Link as MuiLink, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: green[800],
        color: "white",
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Food Wastage Reduction. All rights
        reserved.
      </Typography>
      <Typography variant="body2">
        Built with ❤️ by{" "}
        <MuiLink
          href="https://shivamganguly.me"
          color="inherit"
          underline="always"
        >
          Shivam Ganguly
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;
