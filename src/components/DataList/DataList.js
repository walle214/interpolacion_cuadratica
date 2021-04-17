import React from 'react';
import DataItem from './DataItem';

const DataList = ({ items }) => (
  <ul className='list-group'>
    {items.map((i) => (
      <DataItem key={i.key} item={i} />
    ))}
  </ul>
);

export default DataList;
