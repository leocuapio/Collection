'use client';

import { useState, useEffect } from 'react';
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
} from '@mui/material';

import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
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

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            onClick={() => router.push('/')}
            sx={{ textTransform: 'none', fontSize: '1.25rem', color: 'inherit' }}
          >
            BestProfessorAI
          </Button>

          <Box style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Box display="flex" gap="2rem">
              <Link href="/features" variant="body1" color="textPrimary" sx={{ textDecoration: 'none' }}>
                Features
              </Link>
              <Link href="/contact" variant="body1" color="textPrimary" sx={{ textDecoration: 'none' }}>
                Contact
              </Link>
              <Link href="/about" variant="body1" color="textPrimary" sx={{ textDecoration: 'none' }}>
                About
              </Link>
            </Box>
          </Box>

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

      <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        padding={2}
      >
        
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={handleOpen}>
            Add
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={handleOpenRemoveModal}>
            Remove Completely
          </Button>
        </Stack>
        <Stack direction="row" spacing={3} width="100%" maxWidth="1200px">
          <Stack width="30%" spacing={2}>
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
          </Stack>
          <Box flex={1} border={'1px solid #333'} bgcolor={'#f0f0f0'} padding={2} borderRadius={1}>
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
            <Stack spacing={2} height="300px" overflow={'auto'} padding={2}>
              {filteredInventory.map(({ name, quantity }) => (
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
          <Button
            onClick={() => {
              addItem(itemName);
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
    </>
  );
}