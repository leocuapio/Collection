'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, TextField, Grid, AppBar, Toolbar, Link, Box, IconButton } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Home() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const navigateToChat = () => {
    router.push('/main');
  };

  const handleSubscribe = () => {
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    // Handle subscription logic here, such as sending the email to an API
    console.log('Subscribed with email:', email);
    // Optionally reset email field
    setEmail('');
  };

  return (
    <div>
      {/* Header with Navigation */}
      <AppBar position="static" color="transparent" elevation={0}>
  <Toolbar style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Button
      onClick={() => router.push('/')}
      sx={{ textTransform: 'none', fontSize: '1.5rem', color: 'inherit' }}
    >
      HobbyCollect
    </Button>

    {/* Flex container for navigation links, centered using margin */}
    <Box style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
      <Box display="flex" gap="2rem">
        <Link href="/features" variant="body1" color="textPrimary" sx={{ textDecoration: 'none', fontSize: '1.2rem'}}>
          Features
        </Link>
        <Link href="/contact" variant="body1" color="textPrimary" sx={{ textDecoration: 'none', fontSize: '1.2rem' }}>
          Contact
        </Link>
        <Link href="/about" variant="body1" color="textPrimary" sx={{ textDecoration: 'none', fontSize: '1.2rem' }}>
          About
        </Link>
      </Box>
    </Box>

    {/* UserButton and Sign-In/Sign-Up buttons */}
    <Box display="flex" alignItems="center" gap="1rem">
      <SignedOut>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', color: 'white' }}
          href="/sign-in"
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', color: 'white' }}
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
      <Container style={{ marginTop: '3rem', textAlign: 'center', paddingTop: '2rem' }}>
        <Typography variant="h2" style={{ fontWeight: 'bold' }} gutterBottom>
        <span style={{ color: '#e5351a' }}>Simple</span> Manage<br></br> Your Collections With Ease.
        </Typography>
        <Container style={{ marginLeft: '3rem', marginRight: '3rem'}}>
        </Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2} direction="column">
      <Grid item xs={12} sm={8} md={6} textAlign="center">
        <Typography variant="h6">
          The best platform for hobbyists to organize and manage their collections, including sneakers, clothing, figurines, and more.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={6} style={{marginTop: '0.8rem'}}>
        <Box display="flex" justifyContent="center" alignItems="center" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: 'black', borderRadius: '20px', marginRight: '1rem' }}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
          <Button
            variant="outlined"
            style={{ borderColor: 'white', color: 'black', borderRadius: '20px', color: '#e5351a'}}
            endIcon={<KeyboardArrowRightIcon />}
            // onClick={handleLearnMore}
          >
            Learn More
          </Button>
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
        <SignedIn>
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToChat}
            style={{ marginTop: '2rem', backgroundColor: 'black' }}
          >
            Hobby
          </Button>
        </SignedIn>

        {/* Optionally show a message for signed-out users */}
        <SignedOut>
          <Typography variant="body1" color="textSecondary" style={{ marginTop: '2rem' }}>
            Please <Link href="/sign-in">log in</Link> to access your collections.
          </Typography>
        </SignedOut>
      </Container>

      {/* Full-Width Banner Image */}
      <Box
        style={{
          marginTop: '3rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginBottom: '3rem', // Add margin bottom to create space between image and footer
        }}
      >
        <img
          src="/blue3.jpg"
          alt="Banner"
          style={{
            width: '100%',
            height: '500px',
            objectFit: 'cover',
            borderRadius: '8px', // Optional: Add slight rounding to the corners
          }}
        />
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#3C3C3C', color: '#fff', padding: '2rem 0' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Simple. Consistent. Useful.
          </Typography>
          <Typography variant="body1" component="p" sx={{ maxWidth: '600px', margin: '0 auto' }}>
            We’re here to improve your academic experience with an AI-powered platform for professor reviews. Our chatbot makes it easy to share and discover feedback, helping you make informed decisions and enhance your learning journey.
          </Typography>
          {/* Subscription Form */}
        <Grid container justifyContent="center" alignItems="center" spacing={2} marginTop={1}>
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
                style={{ maxWidth: '350px', color: 'white'}} // Set max width for the text field
                InputProps={{
                  style: {
                    color: 'white', // Text color inside the TextField
                  },
                  // Border color for the TextField
                  classes: {
                    notchedOutline: 'textfield-outline',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white', // Label color of the TextField
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', // Border color when focused
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#3C3C3C', marginLeft: '1rem', borderRadius: '20px'}}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid> 
        <Typography variant="caption" display="block" style={{ marginTop: '1rem' }}>
          See our <Link href="#">Terms and Conditions</Link>
        </Typography>

        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Button variant="contained" color="primary" sx={{ margin: '0 0.5rem', borderRadius: '20px', backgroundColor: '#e5351a'}} href= '/contact'>
            Contact us
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Typography variant="body2" component="p">
            © 2024 by LC. All Rights Reserved.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
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