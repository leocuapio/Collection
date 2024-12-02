"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Link,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  TextField,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GroupIcon from "@mui/icons-material/Group";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    console.log("Subscribed with email:", email);
    setEmail("");
  };
  return (
    <div>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => router.push("/")}
            sx={{ textTransform: "none", fontSize: "1.5rem", color: "inherit" }}
          >
            <img
              src="/HobbyCollect.png"
              alt="Logo"
              style={{ height: "80px" }}
            />
          </Button>

          {/* Flex container for navigation links, centered using margin */}
          <Box
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box display="flex" gap="2rem">
              <SignedIn>
                <Link
                  href="/collections"
                  variant="body1"
                  color="textPrimary"
                  sx={{ textDecoration: "none", fontSize: "1.2rem" }}
                >
                  Collections
                </Link>
              </SignedIn>
              <Link
                href="/features"
                variant="body1"
                color="textPrimary"
                sx={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                Features
              </Link>
              <Link
                href="/contact"
                variant="body1"
                color="textPrimary"
                sx={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                Contact
              </Link>
              <Link
                href="/about"
                variant="body1"
                color="textPrimary"
                sx={{ textDecoration: "none", fontSize: "1.2rem" }}
              >
                About
              </Link>

              {/* Conditionally show Collections tab if signed in */}
            </Box>
          </Box>

          {/* UserButton and Sign-In/Sign-Up buttons */}
          <Box display="flex" alignItems="center" gap="1rem">
            <SignedOut>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
                href="/sign-up"
              >
                Sign Up
              </Button>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}

      {/* Our Values Section */}
     {/* Core Values Section */}
<Container sx={{ padding: "4rem 0" }}>
  <Typography
    textAlign="center"
    variant="h2"
    sx={{
      fontWeight: "bold",
      marginBottom: "2rem",
      fontSize: { xs: "2rem", sm: "3rem" },
    }}
  >
    Our Core <span style={{ color: "#e5351a" }}>Values</span>
  </Typography>
  <Typography
    variant="h6"
    textAlign="center"
    sx={{ maxWidth: "700px", margin: "0 auto", marginBottom: "3rem", color: "#555" }}
  >
    At HobbyCollect, we&apos;re passionate about empowering collectors through innovation, community, and shared passion.
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    {/* Core Value Cards */}
    {[
      {
        icon: <GroupIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Community",
        description: "We foster a space where collectors connect, share, and grow together.",
      },
      {
        icon: <EmojiObjectsIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Innovation",
        description: "We bring cutting-edge technology to help you manage and showcase your collection.",
      },
      {
        icon: <CollectionsIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Passion",
        description: "As collectors ourselves, we understand the passion and dedication behind every collection.",
      },
    ].map(({ icon, title, description }, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "250px",
            padding: "2rem",
            textAlign: "center",
            border: "1px solid #e0e0e0",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {icon}
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#777" }}>
            {description}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>

{/* How It Works Section */}
<Container sx={{ padding: "4rem 0" }}>
  <Typography
    variant="h4"
    textAlign="center"
    fontWeight="bold"
    sx={{ marginBottom: "2rem", fontSize: { xs: "1.8rem", sm: "2.4rem" } }}
  >
    How It Works
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    {[
      {
        step: "1. Sign Up",
        description: "Create an account to join our vibrant collector's community.",
      },
      {
        step: "2. Add Your Items",
        description: "Easily upload and organize your collection with our tools.",
      },
      {
        step: "3. Connect",
        description: "Interact with fellow collectors and discover new treasures.",
      },
    ].map(({ step, description }, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={index}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#e5351a",
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {index + 1}
        </Box>
        <Typography variant="h6" gutterBottom>
          {step}
        </Typography>
        <Typography variant="body2" sx={{ color: "#777", maxWidth: "250px" }}>
          {description}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: "gray",
          color: "white",
          textAlign: "center",
          padding: "4rem 1rem",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Ready to Start Collecting?
        </Typography>
        <Typography variant="body1" sx={{ margin: "1rem 0" }}>
          Join the HobbyCollect community today and take your collection to the
          next level.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "#FF6B6B",
            borderRadius: "25px",
            padding: "0.8rem 1rem",
            marginTop: "2rem",
          }}
          href="/sign-up"
        >
          Get Started
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{ backgroundColor: "#3C3C3C", color: "#fff", padding: "1.56rem 0" }}
      >
        <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Simple. Consistent. Useful.
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Explore curated collections, share your own, and connect with fellow
            enthusiasts. Join our community to stay updated with the latest
            trends. Lastly, subscribe to our newsletter for exclusive updates
            and offers.
          </Typography>
          {/* Subscription Form */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            marginTop={1}
          >
            <Grid item xs={12} sm={8} md={6}>
              <Box position="relative">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <TextField
                    variant="outlined"
                    label="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(error)}
                    fullWidth
                    style={{ maxWidth: "350px", color: "white" }}
                    InputProps={{
                      style: {
                        color: "white", // Text color inside the TextField
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white", // Label color of the TextField
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white", // Default border color
                        },
                        "&:hover fieldset": {
                          borderColor: "white", // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white", // Border color when focused
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    style={{ marginLeft: "16px", borderRadius: "20px" }}
                    onClick={handleSubscribe}
                    sx={{ backgroundColor: "#e5351a" }}
                  >
                    Subscribe
                  </Button>
                </Box>
                {error && (
                  <Typography
                    variant="caption"
                    color="error"
                    style={{
                      position: "absolute",
                      bottom: "-20px", // Position the error below the text field
                    }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="caption"
            display="block"
            style={{ marginTop: "1rem" }}
          >
            See our <Link href="#">Terms and Conditions</Link>
          </Typography>
        </Box>
        {/* <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Button variant="contained" color="primary" sx={{ margin: '0 0.5rem', borderRadius: '20px', backgroundColor: '#e5351a'}} href= '/contact'>
            Contact us
          </Button>
        </Box> */}
        <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
          <Typography variant="body2" component="p">
            © 2024 by LC. All Rights Reserved.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <IconButton color="inherit" href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
}
