import React from 'react';
import { ButtonToolbar, Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const Settings = ({ range, setRange, setSort, sort }) => {
  return (<Row>
    <Col xs={6}>
      <h2>Weeks to show</h2>
      <input type="range" min="1" max="5" value={range} className="slider" onChange={(e) => setRange(e.target.value)}/>
      <div className="text-center margin-top"><span className="h2">&nbsp;{range}&nbsp;</span></div>
    </Col>
    <Col xs={6}>
      <h2>Sort by</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="radio" name="options" defaultValue={sort} onChange={(value) => setSort(value)}>
          <ToggleButton value="overall">Overall</ToggleButton>
          <ToggleButton value="attack">Attack</ToggleButton>
          <ToggleButton value="defence">Defence</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </Col>
    <hr />
    <br />
  </Row>);
};

export default Settings;
