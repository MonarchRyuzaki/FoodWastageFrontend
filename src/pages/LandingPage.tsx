import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import aboutImage from "../assets/about.webp";
import heroImage from "../assets/hero.png";

const LandingPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: green[50],
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            gutterBottom
            sx={{ color: green[700], fontWeight: "bold" }}
          >
            Join the Fight Against Food Wastage
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Connect, Donate, and Make a Real Impact in Reducing Waste.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: green[700] }}
            href="/donations"
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Content Sections */}
      <Container sx={{ flexGrow: 1, py: 8 }}>
        <Grid container spacing={4} alignItems={"center"}>
          {/* Text Left, Image Right */}
          <Grid
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={8}
          >
            <Grid component="section" flexDirection={"row"}>
              <Typography variant="h4" gutterBottom sx={{ color: green[800] }}>
                Easy Donations
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Browse available food donations from local farmers and NGOs.
                Claim what you need or coordinate donations to those in need.
              </Typography>
              <Button
                variant="outlined"
                sx={{ borderColor: green[700], color: green[700] }}
                href="/donations"
              >
                View Donations
              </Button>
            </Grid>
            <Grid component="section">
              <Box
                component="img"
                src={heroImage}
                alt="Easy Donations"
                sx={{ width: "100%", borderRadius: 2 }}
              />
            </Grid>
          </Grid>

          {/* Image Left, Text Right */}
          <Grid
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={8}
          >
            <Grid>
              <Box
                component="img"
                src={aboutImage}
                alt="About Us"
                sx={{ width: "100%", borderRadius: 2 }}
              />
            </Grid>
            <Grid component="section">
              <Typography variant="h4" gutterBottom sx={{ color: green[800] }}>
                About Us
              </Typography>
              <Typography variant="body1">
                We are on a mission to reduce food wastage by connecting surplus
                food providers directly with consumers and nonprofits. Our
                platform leverages smart logistics to ensure that every edible
                item finds a purpose, helping communities and preserving
                resources.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
