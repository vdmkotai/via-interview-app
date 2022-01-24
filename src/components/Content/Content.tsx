import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import Box from '@mui/material/Box';

import TabPanel from '../TabPanel/TabPanel';
import TabPanelCard from '../TabPanelCard';
import { UtilizationData } from '../../models/data';
import CircularProgress from '@mui/material/CircularProgress';

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

export interface ContentProps {
  data: UtilizationData | null;
}

const Content: React.FC<ContentProps> = ({ data }) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleChange = React.useCallback((_: any, value: number) => {
    setSelectedTabIndex(value);
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <Tabs
        value={selectedTabIndex}
        onChange={handleChange}
        aria-label="basic tabs example"
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab label="Utilization Bars" {...a11yProps(0)} />
        <Tab label="Utilization Text" {...a11yProps(1)} />
      </Tabs>
      {data ? (
        <>
          <TabPanel value={selectedTabIndex} index={0}>
            <TabPanelCard type="bar" data={data} />
          </TabPanel>
          <TabPanel value={selectedTabIndex} index={1}>
            <TabPanelCard type="text" data={data} />
          </TabPanel>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Content;
