import React from 'react';
import * as Util from './util';
import * as CustomChartProps from './custom_chart_props';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';


export const BarChartStacked = ({barChartData, title}) => {
  return (
    <article className="chart">
      <h2>{title}</h2>
      <BarChart width={600} height={400} data={barChartData}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis />
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="male" stackId="a" fill={Util.FILLS[0]} />
       <Bar dataKey="female" stackId="a" fill={Util.FILLS[1]} />
      </BarChart>
    </article>
  );
};
