import AppBar from '@mui/material/AppBar';
import { SxProps } from '@mui/system';
import React from 'react';

import { COLORS } from '../../constants/colors';

const styles: SxProps = {
  backgroundColor: COLORS.navbarColor,
  top: { xs: 0, sm: 'auto' },
  left: { xs: 'auto', sm: 0 },
  height: { xs: 50, sm: '100vh' },
  width: { xs: 'auto', sm: 50 },
};

const Navbar: React.FC = () => <AppBar sx={styles} position="relative" />;

export default Navbar;
