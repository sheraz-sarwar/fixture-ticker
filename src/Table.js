import React from 'react';
import ReactTable from 'react-table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-table/react-table.css';

const getColour = (difficulty) => {
  if (difficulty < 13) {
    return '#4CAF50';
  } else if (difficulty < 25) {
    return '#8BC34A';
  } else if (difficulty < 38) {
    return '#CDDC39';
  } else if (difficulty < 50) {
    return '#FFEB3B';
  } else if (difficulty < 63) {
    return '#FFC107';
  } else if (difficulty < 75) {
    return '#FF9800';
  } else if (difficulty < 88) {
    return '#FF5722';
  } else {
    return '#F44336';
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

const getCell = (row) => {
  if (row.length === 2) {
    return (
      <div>
        <div
          style={{
            width: '50%',
            height: '100%',
            backgroundColor: getColour(row[0].overall),
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
            backgroundColor: getColour(row[1].overall),
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
      backgroundColor: getColour(row[0].overall),
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
    Cell: row => (getCell(row.value)),
    sortMethod: (a, b) => {
      let first;
      let second;
      if (sort === 'overall') {
        if (a.length === 2) {
          first = (parseInt(a[0].overall, 10) + parseInt(a[1].overall, 10)) / 2;
          second = (parseInt(b[0].overall, 10) + parseInt(b[1].overall, 10)) / 2;
        } else {
          first = parseInt(a[0].overall, 10);
          second = parseInt(b[0].overall, 10);
        }
      }
      if (sort === 'attack') {
        if (a.length === 2) {
          first = (parseInt(a[0].attack, 10) + parseInt(a[1].attack, 10)) / 2;
          second = (parseInt(b[0].attack, 10) + parseInt(b[1].attack, 10)) / 2;
        } else {
          first = parseInt(a[0].attack, 10);
          second = parseInt(b[0].attack, 10);
        }
      }
      if (sort === 'defence') {
        if (a.length === 2) {
          first = (parseInt(a[0].defence, 10) + parseInt(a[1].defence, 10)) / 2;
          second = (parseInt(b[0].defence, 10) + parseInt(b[1].defence, 10)) / 2;
        } else {
          first = parseInt(a[0].defence, 10);
          second = parseInt(b[0].defence, 10);
        }
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
