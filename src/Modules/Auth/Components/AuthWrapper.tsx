import { styled } from '@mui/material/styles';
import image from 'Assets/Images/background-image.jpg';

export const AuthWrapper = styled('div')(({  }) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%'
}));
