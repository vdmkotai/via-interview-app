import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LinearProgress from '@mui/material/LinearProgress';

export interface BarItemProps {
  // TODO: create enum
  type: 'available' | 'regular' | 'carpool';
  color: string;
  value: number;
}

// TODO: create enum
const header = {
  available: 'Available',
  regular: 'Regular',
  carpool: 'Carpool',
};

const BarItem: React.FC<BarItemProps> = ({ type, color, value }) => (
  <Box sx={{ padding: '15px 0', color }}>
    <Typography>{header[type]}</Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <DirectionsCarIcon />
      <Box sx={{ width: '80%' }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: '3px',
            top: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            colorPrimary: {
              backgroundColor: '#00695C',
            },
            barColorPrimary: {
              backgroundColor: '#B2DFDB',
            },
          }}
        />
      </Box>
      <Typography sx={{ color: 'black' }}>{value}</Typography>
    </Box>
  </Box>
);

export default BarItem;
