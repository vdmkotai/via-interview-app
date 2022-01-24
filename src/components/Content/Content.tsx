import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import Box from '@mui/material/Box';
import axios, { AxiosResponse } from 'axios';

import TabPanel from '../TabPanel/TabPanel';
import TabPanelCard from '../TabPanelCard';
import { UtilizationData } from '../../models/data';
import { API_URL } from '../../constants/urls';

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const Content = () => {
  const [data, setData] = React.useState<UtilizationData | null>(null);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const intervalRef = React.useRef<any>(null);

  const handleChange = React.useCallback((_: any, value: number) => {
    setSelectedTabIndex(value);
  }, []);

  const loadData = async () => {
    try {
      const res: AxiosResponse<UtilizationData> = await axios.get(API_URL);

      if (res.statusText === 'OK') {
        setData(res.data);
      } else {
        throw new Error();
      }
    } catch (e) {
      setData(null);
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadData(); // first call

    intervalRef.current = () => setInterval(loadData, 5000);
    intervalRef.current();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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
        'Loading...'
      )}
    </Box>
  );
};

export default Content;
