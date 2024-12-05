"use client";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
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
  Drawer,
  List,
  ListItem,
  ListItemText,
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
import GroupIcon from "@mui/icons-material/Group";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CollectionsIcon from "@mui/icons-material/Collections";

import MenuIcon from '@mui/icons-material/Menu';
export default function Features() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigatetocontact = () => {
    router.push("/contact");
  };
  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    console.log("Subscribed with email:", email);
    setEmail("");
  };
  const isMobile = useMediaQuery("(max-width: 600px)"); // Check if screen is mobile-sized
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle drawer open/close on mobile
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div>
      {/* Header with Navigation */}
      <AppBar
      position="fixed" // Fix the navbar to the top
      style={{
        backgroundColor: "white", // Set the background color to white
        boxShadow: "0px 4px 2px -2px white", // Optional: Add shadow for visual separation
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

        {/* Mobile Hamburger Menu Icon */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer}
            aria-label="menu"
            sx={{
              marginLeft: 'auto',
              color: 'black', // Ensure icon is black (or a contrasting color)
              display: 'block', // Ensure icon is visible and clickable
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Flex container for navigation links, centered on desktop */}
        {!isMobile && (
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
        )}

        {/* UserButton and Sign-In/Sign-Up buttons */}
        <Box display="flex" alignItems="center" gap="1rem">
          <SignedOut>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white", borderRadius: "20px" }}
              href="/sign-in"
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white", borderRadius: "20px" }}
              href="/sign-up"
            >
              Sign Up
            </Button>
          </SignedOut>

          {/* Hide UserButton on mobile */}
          {!isMobile && (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}
        </Box>
      </Toolbar>

      {/* Drawer (Mobile Menu) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button>
              <ListItemText>
                <Link
                  href="/collections"
                  variant="body1"
                  color="textPrimary"
                  sx={{ textDecoration: "none" }}
                >
                  Collections
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <Link
                  href="/features"
                  variant="body1"
                  color="textPrimary"
                  sx={{ textDecoration: "none" }}
                >
                  Features
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <Link
                  href="/contact"
                  variant="body1"
                  color="textPrimary"
                  sx={{ textDecoration: "none" }}
                >
                  Contact
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <Link
                  href="/about"
                  variant="body1"
                  color="textPrimary"
                  sx={{ textDecoration: "none" }}
                >
                  About
                </Link>
              </ListItemText>
            </ListItem>
            <SignedIn>
              <ListItem button>
                <ListItemText>
                  <UserButton />
                </ListItemText>
              </ListItem>
            </SignedIn>
            <SignedOut>
              <ListItem button>
                <ListItemText>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "white", borderRadius: "20px" }}
                    href="/sign-in"
                  >
                    Login
                  </Button>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "white", borderRadius: "20px" }}
                    href="/sign-up"
                  >
                    Sign Up
                  </Button>
                </ListItemText>
              </ListItem>
            </SignedOut>
          </List>
        </Box>
      </Drawer>
    </AppBar>

  {/* Main Features Section */}
  <Container sx={{ marginTop: "6rem", padding: "4rem 0" }}>
  <Typography
    textAlign="center"
    variant="h2"
    sx={{
      fontWeight: "bold",
      marginBottom: "2rem",
      fontSize: { xs: "2rem", sm: "3rem" },
    }}
  >
    Explore Our <span style={{ color: "#e5351a" }}>Features</span>
  </Typography>

  <Typography
    variant="h6"
    textAlign="center"
    sx={{ maxWidth: "700px", margin: "0 auto", marginBottom: "3rem", color: "#555" }}
  >
    Discover how HobbyCollect simplifies managing your collections with real-time data, 
    advanced tools, and intuitive features.
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    {/* Core Value Cards */}
    {[
      {
        icon: <FilterAltIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Advanced Filtering",
        description: "Filter your collection by brand, price, year, and more to find exactly what you're looking for.",
      },
      {
        icon: <CategoryIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Grouping and Categorizing",
      description:
      "Easily organize your sneakers into groups by brand, release date, or custom categories.",
      },
      {
        icon: <SearchIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Search Functionality",
    description:
      "Quickly search your entire collection by sneaker name, brand, or other details with our efficient search bar.",
      },
      {
        icon: <TrendingUpIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Price Tracking",
    description:
      "Track sneaker prices in real-time, and monitor how the value of your collection changes over time.",
      },
      {
        icon: <AddShoppingCartIcon sx={{ fontSize: "3.5rem", color: "#e5351a" }} />,
        title: "Add and Remove Sneakers",
    description:
      "Easily manage your collection by adding or removing sneakers with a user-friendly interface.",
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
            borderRadius: "10px",
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
          onClick={navigatetocontact}
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