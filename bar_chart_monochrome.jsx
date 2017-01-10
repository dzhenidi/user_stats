import React from 'react';
import * as Util from './util';
import { tooltipContent, wrapperStyle } from './custom_chart_props';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';


export const BarChartMonochrome = ({barChartData, title, numUsers}) => (
    <article className="chart">
      <h2>{title}</h2>
      <BarChart
        width={600}
        height={300}
        data={Util.toArray(barChartData)}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis minTickGap={0} dataKey="name" tick={{strokeWidth: 1, width: 20, height: 20, color: "#000"}} wrapperStyle={{fontSize: 9}}/>
        <YAxis
          tickFormatter={Util.getPercent.bind(null, 40)}
          interval="preserveStartEnd"
          allowDecimals={true}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip
          content={tooltipContent.bind(null, numUsers)}
          wrapperStyle={wrapperStyle}
          />
        <Bar dataKey="female" fill={Util.FILLS[3]} />
      </BarChart>
    </article>
);
