import * as Util from './util';
import React from 'react';

export const tooltipContent = (total, o) => {
  const { payload, label } = o;
  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{color: entry.color}}>
              {`${entry.name}: ${entry.value} (${Util.getPercent(total, entry.value)})`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
