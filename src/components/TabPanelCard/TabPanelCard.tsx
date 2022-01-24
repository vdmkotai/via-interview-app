import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { COLORS } from '../../constants/colors';
import BarItem from '../BarItem';
import { UtilizationData } from '../../models/data';

export interface TabPanelCardProps {
  type: 'bar' | 'text';
  data: UtilizationData;
}

const TabPanelCard: React.FC<TabPanelCardProps> = ({ type, data }) => {
  const sum = data.available + data.regular + data.carpool;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {type === 'bar' ? `UTILIZATION (${sum})` : 'UTILIZATION TEXT'}
        </Typography>
        <Divider />

        {type === 'bar' ? (
          <Box sx={{ textAlign: 'left' }}>
            <BarItem
              type="available"
              value={data.available}
              color={COLORS.availableColor}
            />
            <BarItem
              type="regular"
              value={data.regular}
              color={COLORS.regularColor}
            />
            <BarItem
              type="carpool"
              value={data.carpool}
              color={COLORS.carpoolColor}
            />
          </Box>
        ) : type === 'text' ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography>Available: {data.available}</Typography>
            <Typography>Regular: {data.regular}</Typography>
            <Typography>Carpool: {data.carpool}</Typography>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default TabPanelCard;
