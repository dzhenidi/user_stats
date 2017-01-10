import React from 'react';
import * as Util from './util';
import { tooltipContent2, renderCustomizedLabel } from './custom_chart_props';
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip
} from 'recharts';


export const PieChartUsers = ({pieChartData, title}) => {
  const data = Util.toArray(pieChartData);
  const total = Util.getUserCount2(pieChartData);

  return (
    <article className="chart pie">
      <h2>{title}</h2>
      <div className="pie-chart-container">
        <PieChart width={250} height={200}>
          <Pie
            data={data}
            cy={"50%"}
            label={renderCustomizedLabel}
            labelLine={false}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Util.FILLS[index]}/>
              ))
            }
          </Pie>
          <Tooltip content={tooltipContent2.bind(null, total)}/>
          <Legend vertical-align="bottom" height={10}/>
        </PieChart>
      </div>
    </article>
  );
};
