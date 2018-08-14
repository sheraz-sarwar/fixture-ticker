import React from 'react';
import ReactTable from 'react-table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-table/react-table.css';

const getDefenceColour = (difficulty) => {
  if (difficulty < 0.6) {
    return '#4CAF50';
  } else if (difficulty < 1) {
    return '#8BC34A';
  } else if (difficulty < 1.4) {
    return '#CDDC39';
  } else if (difficulty < 1.8) {
    return '#FFEB3B';
  } else if (difficulty < 2.2) {
    return '#FFC107';
  } else if (difficulty < 2.6) {
    return '#FF9800';
  } else if (difficulty < 3.0) {
    return '#FF5722';
  } else {
    return '#F44336';
  }
};

const getOverallColour = (difficulty) => {
  if (difficulty < 0.6) {
    return '#F44336';
  } else if (difficulty < 1) {
    return '#FF5722';
  } else if (difficulty < 1.4) {
    return '#FF9800';
  } else if (difficulty < 1.8) {
    return '#FFC107';
  } else if (difficulty < 2.2) {
    return '#FFEB3B';
  } else if (difficulty < 2.6) {
    return '#CDDC39';
  } else if (difficulty < 3.0) {
    return '#8BC34A';
  } else {
    return '#4CAF50';
  }
};

const getColour = (row, sort) => {
  // Current 'overall' and 'attack' are treated the same
  if (sort === 'overall' || sort === 'attack') {
    return getOverallColour(row.overall);
  }

  if (sort === 'defence') {
    return getDefenceColour(row.defence);
  }
};

const CellText = ({ row }) => (
  <OverlayTrigger placement="bottom" overlay={(
    <Tooltip id="tooltip">
      <strong>Overall</strong> {row.overall}<br />
      <strong>Attack</strong> {row.attack}<br />
      <strong>Defence</strong> {row.defence}<br />
      <strong>Date</strong> {row.date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br />
    </Tooltip>
  )}>
    <span>{row.opponent}</span>
  </OverlayTrigger>
);

const getCell = (row, sort) => {
  if (!row) {
      return (<div style={{width: '100%', height: '100%', backgroundColor: '#aaa', padding: '4px', display: 'inline-block'}} />);
  }

  if (row.length === 2) {
    return (
      <div>
        <div
          style={{
            width: '50%',
            height: '100%',
            backgroundColor: getColour(row[0], sort),
            padding: '4px',
            display: 'inline-block',
            marginRight: '4px',
          }}
        >
          <CellText row={row[0]}/>
        </div>
        <div
          style={{
            width: '50%',
            height: '100%',
            backgroundColor: getColour(row[1], sort),
            padding: '4px',
            display: 'inline-block',
          }}
        >
          <CellText row={row[1]}/>
        </div>
      </div>
    );
  }

  return (<div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: getColour(row[0], sort),
      padding: '4px',
      display: 'inline-block',
    }}
  >
    <CellText row={row[0]}/>
  </div>);
};

const Table = ({ data, gameweeks, range, sort }) => {
  const now = new Date();
  now.setDate(now.getDate() - 7);

  const columns = Object.entries(gameweeks).filter(([gameweek, date]) => (date > now)).slice(0, range).map(value => ({
    Header: value[0],
    accessor: value[0].toLowerCase(),
    Cell: row => (getCell(row.value, sort)),
    sortMethod: (a, b) => {
      let first;
      let second;
      if (sort === 'overall') {
        first = (a.length === 2) ? (parseFloat(a[0].overall, 10) + parseFloat(a[1].overall, 10)) : parseFloat(a[0].overall, 10);
        second = (b.length === 2) ? (parseFloat(b[0].overall, 10) + parseFloat(b[1].overall, 10)) : parseFloat(b[0].overall, 10);
      }
      if (sort === 'attack') {
        first = (a.length === 2) ? (parseFloat(a[0].attack, 10) + parseFloat(a[1].attack, 10)) : parseFloat(a[0].attack, 10);
        second = (b.length === 2) ? (parseFloat(b[0].attack, 10) + parseFloat(b[1].attack, 10)) : parseFloat(b[0].attack, 10);
      }
      if (sort === 'defence') {
        first = (a.length === 2) ? (parseFloat(a[0].defence, 10) + parseFloat(a[1].defence, 10)) : parseFloat(a[0].defence, 10);
        second = (b.length === 2) ? (parseFloat(b[0].defence, 10) + parseFloat(b[1].defence, 10)) : parseFloat(b[0].defence, 10);
      }

      return first > second ? 1 : -1;
    }
  }));
  columns.unshift({
    Header: 'Name',
    accessor: 'teamName',
  });

  return (<ReactTable
    data={data}
    showPagination={false}
    className='-striped -highlight'
    style={{ textAlign: 'center' }}
    columns={columns}
  />);
};

export default Table;
