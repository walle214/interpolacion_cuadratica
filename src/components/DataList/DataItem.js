import React from 'react';
import DataItemRow from './DataItemRow';
const DataItem = ({ item: { currentX, xValue, fxValue } }) => (
  <div className='mt-2 mb-4'>
    <DataItemRow number={currentX} value={xValue}>
      X
    </DataItemRow>
    <DataItemRow number={currentX} value={fxValue}>
      Fx
    </DataItemRow>
  </div>
);
export default DataItem;
