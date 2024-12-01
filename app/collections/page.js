'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, AppBar, Toolbar, Link, Grid, Button, IconButton, TextField } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Collections() {
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with Navigation */}
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
            <img src="/HobbyCollect.png" alt="Logo" style={{ height: "80px" }} />
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
                  href="/main"
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

      {/* Main Content */}
      <Container
        style={{
          marginTop: '3rem',
          textAlign: 'center',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center items vertically
        }}
      >
        <Typography variant="h3" style={{ fontWeight: 'bold' }} gutterBottom>
          Collections
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                border: '1px solid #e5351a',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure boxes are the same height
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <img src="homepage.jpg" alt="Sneaker Collection" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '1rem' }} />
                <Typography variant="h5">Sneaker Collections</Typography>
                <Typography variant="body1" paragraph>
                  Explore our curated selection of sneaker collections.
                </Typography>
              </Box>
              <Button variant="contained" sx={{ backgroundColor: '#e5351a' }} href = '/collections/sneaker'>
                View Collection
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                border: '1px solid #e5351a',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure boxes are the same height
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <img src="techphoto.jpg" alt="Tech Collection" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '1rem' }} />
                <Typography variant="h5">Tech Collections</Typography>
                <Typography variant="body1" paragraph>
                  Discover the latest in tech collections available for you.
                </Typography>
              </Box>
              <Button variant="contained" sx={{ backgroundColor: '#e5351a' }}>
                View Collection
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                border: '1px dashed #e5351a',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure boxes are the same height
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <img src="/path/to/coming-soon.jpg" alt="Coming Soon" style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '1rem' }} />
                <Typography variant="h5">Coming Soon</Typography>
                <Typography variant="body1" paragraph>
                  Stay tuned for our upcoming collections!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{ backgroundColor: "#3C3C3C", color: "#fff", padding: "1rem 0" }}
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