import React from 'react';
import * as Util from './util';
import * as CustomChartProps from './custom_chart_props';
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip
} from 'recharts';

export const PieChartUsers = ({pieChartData, title}) => {
  //data needs to be an array, convert to percents and array
  const data = [{name: "female", value: 400}, {name: "male", value: 300}];
  return (
    <article className="chart">
      <h2>{title}</h2>
      <PieChart width={250} height={250}>
        <Pie data={pieChartData} startAngle={180} endAngle={0} cx="50%" cy="50%" outerRadius={80} label>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={Util.FILLS[index]}/>
            ))
          }
        </Pie>
        <Tooltip/>
        <Legend />
      </PieChart>
    </article>
  );
};
