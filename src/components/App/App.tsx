import React from 'react';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from '../Content';
import axios, { AxiosResponse } from 'axios';
import { UtilizationData } from '../../models/data';
import { API_URL } from '../../constants/urls';

const App = () => {
  const [data, setData] = React.useState<UtilizationData | null>(null);
  const intervalRef = React.useRef<any>(null);

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
    <>
      <Navbar />
      <Sidebar>
        <Content data={data} />
      </Sidebar>
    </>
  );
};

export default App;
