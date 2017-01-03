import * as Util from './util';
import React from 'react';

export const tooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);
  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{color: entry.color}}>
              {`${entry.name}: ${entry.value}(${Util.getPercent(total, entry.value)})`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
