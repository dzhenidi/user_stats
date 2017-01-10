import * as Util from './util';
import React from 'react';

export const tooltipContent = (total, o) => {
  const { payload, label } = o;
  return (
    <div className="customized-tooltip-content">
      <p className="total">{ label !== 0 ? label : `Total: ${total}` }</p>
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

export const wrapperStyle = {
  padding: '10px',
  backgroundColor: '#fff',
  border: '2px solid #d3d3d3',
  borderRadius: '5px'
};

export const tooltipContent2 = (total, o) => {
  const { payload, label } = o;

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} Total: ${total}`}</p>
      <ul className="list">
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{color: entry.color}}>
              {`${entry.name}: ${entry.value} (${Util.toPercent(entry.percent)})`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central">
    	{ percent > 0 ? `${(percent * 100).toFixed(0)}%` : null }
    </text>
  );
};
