import React from 'react';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Content from '../Content';

const App = () => (
  <>
    <Navbar />
    <Sidebar>
      <Content />
    </Sidebar>
  </>
);

export default App;
