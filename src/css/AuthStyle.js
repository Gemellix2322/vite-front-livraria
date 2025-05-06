import { Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Logo from "../img/gemellibackground.png";

// Main container that covers the entire viewport with no margins or padding
export const AuthContainer = styled(Box)({
  height: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${Logo})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  overflow: 'hidden', // Prevent scrollbars
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

export const GhostColumn = styled(Box)({
  flex: 1, 
});


export const FormColumn = styled(Box)({
  flex: 1, 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  width: '450px',
  height: '100%',
});

export const StyledTextField = styled(TextField)({
  marginBottom: '15px',
  '& .MuiInputBase-root': {
    backgroundColor: '#707070',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    color: 'black',
    '&:hover': {
      backgroundColor: '#c5c5c5',
      '& input': {
        color: 'black'
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    '&.Mui-focused': {
      color: 'black'
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
});

export const StyledButton = styled(Button)({
  marginTop: '10px',
  marginBottom: '15px',
  backgroundColor: '#7e7e7e',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: '#268f00',
    color: 'black'
  }
});

export const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
});