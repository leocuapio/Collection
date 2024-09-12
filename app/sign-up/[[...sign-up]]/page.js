import { AppBar, Container, Toolbar, Button, Typography, Box } from "@mui/material";
import Link from 'next/link';
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <Container maxWidth="100vw">
<AppBar position="static" sx = {{background: 'black'}} >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        BestProfessorAI
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>Login</Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>Sign Up</Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <SignUp />
            </Box>
        </Container>
    );
}