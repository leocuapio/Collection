"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  Link,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';



export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [scrolling, setScrolling] = useState(false);  // Initialize scrolling state
  const router = useRouter();

  const navigateToChat = () => {
    router.push("/main");
  };

  const navigatetocreate = () => {
    router.push("/collections");
  };
  const navigatetofeatures = () => {
    router.push("/features");
  };

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

      {/* Main Content */}
      <Container
        style={{ marginTop: "3rem", textAlign: "center", paddingTop: "6rem" }}
      >
        <Typography variant="h2" style={{ fontWeight: "bold" }} gutterBottom>
          <span style={{ color: "#e5351a" }}>Simple</span> Manage<br></br> Your
          Collections With Ease.
        </Typography>
        <Container
          style={{ marginLeft: "3rem", marginRight: "3rem" }}
        ></Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          direction="column"
        >
          <Grid item xs={12} sm={8} md={6} textAlign="center">
            <Typography variant="h6">
              The best platform for hobbyists to organize and manage their
              collections, including sneakers, clothing, figurines, and more.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} style={{ marginTop: "0.8rem" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <SignedIn>
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "black",
                  borderRadius: "20px",
                  marginRight: "1rem",
                }}
                onClick={navigatetocreate}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                style={{
                  borderColor: "white",
                  color: "black",
                  borderRadius: "20px",
                  color: "#e5351a",
                }}
                endIcon={<KeyboardArrowRightIcon />}
                onClick={navigatetofeatures}
              >
                Learn More
              </Button>
              </SignedIn>
            </Box>
          </Grid>
        </Grid>

        {/* Subscription Form */}
        {/* <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8} md={6}>
            <Box display="flex" alignItems="center">
              <TextField
                variant="outlined"
                label="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
                helperText={error}
                fullWidth
                style={{ maxWidth: '350px' }} // Set max width for the text field
              />
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'black', marginLeft: '1rem' }}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid> */}
        {/* <Typography variant="caption" display="block" style={{ marginTop: '1rem' }}>
          See our <Link href="#">Terms and Conditions</Link>
        </Typography> */}

        {/* Navigate to Chat Button - Show only if user is signed in */}
       

        {/* Optionally show a message for signed-out users */}
        <SignedOut>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "2rem" }}
          >
            Please <Link href="/sign-in">log in</Link> to access your
            collections.
          </Typography>
        </SignedOut>
      </Container>

      {/* Full-Width Banner Image */}
      <Box
        style={{
          marginTop: "3rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginBottom: "2rem", // Add margin bottom to create space between image and footer
        }}
      >
        <img
          src="/homepage.jpg"
          alt="Banner"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            borderRadius: "8px", // Optional: Add slight rounding to the corners
          }}
        />
      </Box>

     
      

{/* Featured Collections Section */}
<Box
  sx={{
    padding: "4rem 2rem",
    backgroundColor: "#fff",
    textAlign: "center",
  }}
>
  <Typography variant="h4" gutterBottom>
    Featured Collections
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="h6">John&apos;s Sneaker Collection</Typography>
      <img src="/john.jpg" alt="Sneakers" style={{ width: "100%" , height: "100%"}} />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="h6">Mary&apos;s Tech Collection</Typography>
      <img src="/mary.jpg" alt="Tech" style={{ width: "100%", height: "100%"}} />
    </Grid>
  </Grid>
</Box>


{/* Collection Spotlight Section */}
<Box
  sx={{
    backgroundColor: "gray",
    padding: "4rem 2rem",
    textAlign: "center",
    color: "white",
  }}
>
  <Typography variant="h4" gutterBottom>
    Suggest a New Collection
  </Typography>
  <Typography variant="body1">
  Have an idea for a new collection that you think would be a great addition to our offerings? <br></br>Share your thoughts with us and help shape the future of our collections!
  </Typography>
  <Button
                    variant="contained"
                    style={{ marginLeft: "16px", borderRadius: "20px", marginTop: "1rem" }}
                    sx={{ backgroundColor: "#e5351a" }}
                    onClick={navigatetocontact}
                  >
                    Suggest Collection
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
