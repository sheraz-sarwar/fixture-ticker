import React from 'react';
import { Grid, Row } from 'react-bootstrap';

import Settings from './SettingsContainer';
import Table from './TableContainer';

const App = () => {
  return (<Grid>
    <Settings />
    <br />
    <Row><Table /></Row>
    <br />
  </Grid>);
};

export default App;
