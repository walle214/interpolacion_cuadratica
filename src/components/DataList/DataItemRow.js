import React from 'react';
import Badge from '../Badge';

const DataItemRow = ({ children, value, number }) => (
  <div className='list-group-item d-flex justify-content-between align-items-center'>
    <div>
      {children}
      <sub>{number}</sub>
    </div>
    <Badge>{value}</Badge>
  </div>
);
export default DataItemRow;
