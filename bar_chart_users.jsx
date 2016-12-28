import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const FILLS = ["#00264d", "#003366", "#004080", "#004d99", "#0059b3", "#0066cc", "#0073e6", "#0080ff", "#1a8cff", "#3399ff"];
const data = [
      {female: 4000, male: 2400}
];
const toPercent = (decimal, fixed=0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};
const getPercent = (value, total) => {
  const decimal = total > 0 ? value / total : 0;
};
export const BarChartUsers = ({barChartData, title}) => {
  const bars = Object.keys(barChartData).map( (dataKey, i) => (
    <Bar
      key={i}
      dataKey={dataKey}
      fill={FILLS[i]}
      maxBarSize={100}
    />
  ));
  return (
    <article className="chart">
      <h2>{title}</h2>
      <BarChart width={600} height={300} data={[barChartData]}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="gender"/>
        <YAxis tickFormatter={toPercent}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
          {bars}
        <Legend />
      </BarChart>
    </article>
    );
};
