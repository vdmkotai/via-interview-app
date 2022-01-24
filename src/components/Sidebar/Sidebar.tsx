import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React from 'react';
import { Global } from '@emotion/react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import { COLORS } from '../../constants/colors';

const Puller = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 10,
}));

const mobileDrawerBleeding = 40;
const desktopDrawerWidth = 340;

const Sidebar: React.FC = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  const [isMobileDrawerOpen, setIsMobileDrawer] = React.useState(false);

  const handleMobileDrawerOpen = React.useCallback(() => {
    console.log('OPEN');
    setIsMobileDrawer(true);
  }, []);

  const handleMobileDrawerClose = React.useCallback(() => {
    setIsMobileDrawer(false);
  }, []);

  return isDesktop ? (
    <Drawer
      anchor="right"
      open
      variant="persistent"
      PaperProps={{
        sx: {
          width: desktopDrawerWidth,
          backgroundColor: COLORS.drawerBgColor,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: desktopDrawerWidth,
            boxSizing: 'border-box',
          },
        },
      }}
    >
      {children}
    </Drawer>
  ) : (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${mobileDrawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />

      <SwipeableDrawer
        PaperProps={{ sx: { backgroundColor: COLORS.drawerBgColor } }}
        swipeAreaWidth={mobileDrawerBleeding}
        open={isMobileDrawerOpen}
        onOpen={handleMobileDrawerOpen}
        onClose={handleMobileDrawerClose}
        anchor="bottom"
        disableDiscovery
        hideBackdrop
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -mobileDrawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: COLORS.drawerBgColor,
            height: mobileDrawerBleeding,
          }}
        >
          <Puller>
            {isMobileDrawerOpen ? (
              <KeyboardArrowDownOutlined onClick={handleMobileDrawerClose} />
            ) : (
              <KeyboardArrowUpOutlinedIcon />
            )}
          </Puller>
        </Box>
        <Box
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            backgroundColor: COLORS.drawerBgColor,
          }}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
