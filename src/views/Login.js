import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy'; // Using Easy Peasy store actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button, TextField, Box, Typography } from '@mui/material'; // Import Material-UI components

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useStoreActions((actions) => actions.loginUser); // Action from store to handle login
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login user
    await loginUser({ email, password });

    // Redirect to appointment list after successful login
    navigate('/appointments');
  };

  const handleRegisterRedirect = () => {
    // Navigate to the Register page
    navigate('/register');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f7fc',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, color: '#333' }}>
        Doctor Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%', maxWidth: 400, padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold', color: '#555' }}>
              Email
            </Typography>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold', color: '#555' }}>
              Password
            </Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              padding: '10px',
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
              marginBottom: 2, // Space between buttons
            }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              padding: '10px',
              borderColor: '#007bff',
              color: '#007bff',
              '&:hover': {
                borderColor: '#0056b3',
                color: '#0056b3',
              },
            }}
            onClick={handleRegisterRedirect} // Redirect to the Register page
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
