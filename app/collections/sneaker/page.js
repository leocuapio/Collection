'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from "@mui/material";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import MenuIcon from '@mui/icons-material/Menu';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [itemPrice, setItemPrice] = useState('');

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  const navigateToChat = () => {
    router.push("/main");
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

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  const addItem = async (item, price) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity, price: existingPrice } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1, price: existingPrice || price });
    } else {
      await setDoc(docRef, { quantity: 1, price: price });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const removeItemCompletely = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    await deleteDoc(docRef);
    await updateInventory();
    setOpenRemoveModal(false);
  };

  useEffect(() => {
    updateInventory();
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = inventory;
    if (searchQuery) {
      filtered = filtered.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === 'low') {
      filtered = filtered.filter(({ quantity }) => quantity <= 5);
    } else if (filter === 'high') {
      filtered = filtered.filter(({ quantity }) => quantity > 5);
    }
    setFilteredInventory(filtered);
  }, [searchQuery, filter, inventory]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRemoveModal = () => setOpenRemoveModal(true);
  const handleCloseRemoveModal = () => setOpenRemoveModal(false);

  if (loading) return <div>Loading...</div>;
  const isMobile = useMediaQuery("(max-width: 600px)"); // Check if screen is mobile-sized
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle drawer open/close on mobile
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
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

<Box
  width="100vw"
  height="70vh"
  display="flex"
  flexDirection="column"
  alignItems="center"
  gap={2}
  padding={2}
>
  {/* Center buttons */}
  <Stack direction="row" spacing={2} mb={2}>
    <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={handleOpen}>
      Add
    </Button>
    <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={handleOpenRemoveModal}>
      Remove Completely
    </Button>
  </Stack>

  {/* Main Content with flexbox */}
  <Stack direction="row" spacing={1} width="100%" maxWidth="1500px">
    {/* Search and Filter Section */}
    <Box width={{ xs: '100%', sm: '33%' }} padding={2}>
      <TextField
        label="Search Items"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          label="Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low Quantity</MenuItem>
          <MenuItem value="high">High Quantity</MenuItem>
        </Select>
      </FormControl>
    </Box>

    {/* Inventory Items Section */}
    <Box
      flex={2}
      border={'1px solid #333'}
      bgcolor={'#f0f0f0'}
      padding={2}
      borderRadius={1}
      overflow="auto"
      height="600px"
    >
      <Box
        width="100%"
        height="100px"
        bgcolor={'#2B2B2B'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h5'} color={'white'} textAlign={'center'}>
          Inventory Items
        </Typography>
      </Box>
      <Stack spacing={2} height="100%" overflow={'auto'}>
  {filteredInventory.map(({ name, quantity, price }) => (
    <Box
      key={name}
      width="100%"
      minHeight="100px"
      display={'flex'}
      alignItems={'center'}
      bgcolor={'#fff'}
      paddingX={2}
      borderRadius={1}
      boxShadow={1}
      justifyContent={'space-between'}
    >
      <Stack width="70%" direction="row" justifyContent="space-between">
        <Typography variant={'h6'} color={'#333'}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
        <Typography variant={'h6'} color={'#333'}>
          {quantity} Item{quantity > 1 ? 's' : ''}
        </Typography>
        <Typography variant={'h6'} color={'#333'}>
          ${price}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#2B2B2B', color: 'white' }}
        onClick={() => removeItem(name)}
      >
        Remove
      </Button>
    </Box>
  ))}
</Stack>
    </Box>
  </Stack>
</Box>

      {/* Add Item Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="add-item-title">
  <Box sx={style}>
    <Typography id="add-item-title" variant="h6" component="h2">
      Add Item
    </Typography>
    <TextField
      label="Item Name"
      variant="outlined"
      fullWidth
      value={itemName}
      onChange={(e) => setItemName(e.target.value)}
    />
    <TextField
      label="Price"
      variant="outlined"
      fullWidth
      value={itemPrice}
      onChange={(e) => setItemPrice(e.target.value)}
      type="number" // Ensure it's a numeric value
    />
    <Button
      onClick={() => {
        addItem(itemName, itemPrice);
        handleClose();
      }}
      sx={{ backgroundColor: '#2B2B2B', color: 'white' }}
      variant="contained"
    >
      Add
    </Button>
  </Box>
</Modal>

      {/* Remove Item Modal */}
      <Modal open={openRemoveModal} onClose={handleCloseRemoveModal} aria-labelledby="remove-item-title">
        <Box sx={style}>
          <Typography id="remove-item-title" variant="h6" component="h2">
            Remove Item
          </Typography>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            onClick={() => {
              removeItemCompletely(itemName);
              handleCloseRemoveModal();
            }}
            sx={{ backgroundColor: '#2B2B2B', color: 'white' }}
            variant="contained"
          >
            Remove
          </Button>
        </Box>
      </Modal>
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
    </>
  );
}