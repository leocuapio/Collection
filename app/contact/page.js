'use client';

import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

import { Container, Typography, Button, Box, AppBar, Toolbar, Link, IconButton, TextField, Grid, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

import MenuIcon from '@mui/icons-material/Menu';
export default function Docs() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
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
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
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
          Contact <span style={{ color: "#e5351a" }}>Us</span>
        </Typography>
        <Typography
    variant="h6"
    textAlign="center"
    sx={{ maxWidth: "700px", margin: "0 auto",  color: "#555" }}
  >
        Get in touch with us to learn more about HobbyCollect and how you can contribute to our growing community of collectors.
        </Typography>
      </Container>

      {/* Contact Form */}
      <Box
        style={{
          marginTop: '3rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginBottom: '3rem',
        }}
      >
        <Container>
          <form action="https://formspree.io/f/mbljwnej" method="POST">
            <TextField
              label="Your Name"
              name="name"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Your Email"
              name="_replyto"
              type="email"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Your Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              style={{ borderRadius: "20px" }}
              sx={{ backgroundColor: "#e5351a", marginTop: '1rem' }}
            >
              Send Message
            </Button>
          </form>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{ backgroundColor: "#3C3C3C", color: "#fff", padding: "2rem 0", marginTop: "auto" }}
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
            We’re here to improve your academic experience with an AI-powered
            platform for professor reviews. Our chatbot makes it easy to share
            and discover feedback, helping you make informed decisions and
            enhance your learning journey.
          </Typography>
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
    </Box>
  );
}