"use client";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Link,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SyncIcon from "@mui/icons-material/Sync";

export default function Features() {
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
      {/* Header with Navigation */}
      <AppBar
  position="fixed"
  color="transparent" // You can keep this as transparent for layout purposes
  elevation={0}
  sx={{
    backgroundColor: "#FFFFFF", // Change to pure white
    zIndex: 1000,
    paddingBottom: '16px', // Space below the navbar
  }}
>
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
      <img src="/HobbyCollect.png" alt="Logo" style={{ height: "80px" }} />
    </Button>

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

  {/* Main Features Section */}
<Container
  style={{
    marginTop: "100px", // Added top margin to prevent overlap with the fixed AppBar
    textAlign: "center",
    paddingBottom: "4rem",
  }}
>
  <Typography variant="h2" style={{ fontWeight: "bold", marginBottom: "2rem" }}>
    Explore Our <span style={{ color: "#e5351a" }}>Features</span>
  </Typography>

  <Typography variant="body1" color="textSecondary" style={{ marginBottom: "4rem" }}>
    Discover how HobbyCollect simplifies managing your collections with real-time data, 
    advanced tools, and intuitive features.
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {/* Feature Cards */}
    {featuresData.map((feature) => (
      <Grid item xs={12} sm={6} md={4} key={feature.title}>
        <Card
          elevation={3}
          style={{
            borderRadius: "15px",
            overflow: "hidden",
            height: "100%", // Ensures all cards have equal height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center", // Center align icon and text
          }}
        >
          {/* Icon replaces the image */}
          <Box style={{ marginTop: "2rem" }}>{feature.icon}</Box>
          <CardContent
            style={{
              textAlign: "center",
              flexGrow: 1, // Ensures the content grows to fill the available space
              marginTop: "1rem", // Adds spacing between the icon and text
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold", marginTop: "1rem" }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: "0.5rem" }}>
              {feature.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>

      {/* Suggestion Call-to-Action */}
      <Box
        sx={{
          backgroundColor: "gray",
          padding: "3rem 2rem",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Want More Features?
        </Typography>
        <Typography variant="body1">
          Suggest a feature that you believe will enhance our platform, and be part of the community-driven improvements!
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#e5351a", borderRadius: "20px", marginTop: "2rem" }}
        >
          Suggest a Feature
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{ backgroundColor: "#3C3C3C", color: "#fff", padding: "2rem 0" }}
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
           Explore curated collections, share your own, and connect with fellow enthusiasts. Join our community to stay updated with the latest trends. Lastly, subscribe to our newsletter for exclusive updates and offers. 
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

// Data for Features
const featuresData = [
  // {
  //   title: "Sneaker Collection Integration",
  //   description:
  //     "Connect with StockX API to fetch live prices, release dates, and price trends for your sneaker collection.",
  //   image: "/sneaker_collection.jpg",
  //   icon: <SyncIcon fontSize="large" style={{ color: "#e5351a" }} />,
  // },
  {
    title: "Advanced Filtering",
    description:
      "Filter your collection by brand, price, year, and more to find exactly what you're looking for.",
    image: "/filtering.jpg",
    icon: <FilterAltIcon fontSize="large" style={{ color: "#e5351a" }} />,
  },
  {
    title: "Grouping and Categorizing",
    description:
      "Easily organize your sneakers into groups by brand, release date, or custom categories.",
    image: "/grouping.jpg",
    icon: <CategoryIcon fontSize="large" style={{ color: "#e5351a" }} />,
  },
  {
    title: "Search Functionality",
    description:
      "Quickly search your entire collection by sneaker name, brand, or other details with our efficient search bar.",
    image: "/search.jpg",
    icon: <SearchIcon fontSize="large" style={{ color: "#e5351a" }} />,
  },
  {
    title: "Add and Remove Sneakers",
    description:
      "Easily manage your collection by adding or removing sneakers with a user-friendly interface.",
    image: "/add_remove.jpg",
    icon: <AddShoppingCartIcon fontSize="large" style={{ color: "#e5351a" }} />,
  },
  {
    title: "Price Tracking",
    description:
      "Track sneaker prices in real-time, and monitor how the value of your collection changes over time.",
    image: "/price_tracking.jpg",
    icon: <TrendingUpIcon fontSize="large" style={{ color: "#e5351a" }} />,
  },
];