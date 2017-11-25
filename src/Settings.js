import React from 'react';
import { Button, ButtonToolbar, Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const Settings = ({ increment, decrement, range, setSort, sort }) => {
  return (<Row>
    <Col xs={6}>
      <h2>Weeks to show</h2>
      <Button onClick={() => decrement(range)}>-</Button>
      <span className="h2">&nbsp;{range}&nbsp;</span>
      <Button onClick={() => increment(range)}>+</Button>
    </Col>
    <Col xs={6}>
      <h2>Sort by</h2>
      <ButtonToolbar>
        <ToggleButtonGroup type="radio" name="options" defaultValue={sort} onChange={(value) => setSort(value)}>
          <ToggleButton value='overall'>Overall</ToggleButton>
          <ToggleButton value='attack'>Attack</ToggleButton>
          <ToggleButton value='defence'>Defence</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </Col>
    <hr />
    <br />
  </Row>);
};

export default Settings;
