import React from 'react';
import * as Util from './util';
import { tooltipContent } from './custom_chart_props';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';


export const BarChartMonochrome = ({barChartData, title, numUsers}) => {
  // const data = {
  //   "state1": {name: "state1", female: 10, male: 12, total: 22},
  //   "state2": {name: "state2", female: 15, male: 17, total: 32},
  //   "state3": {name: "state3", female: 15, male: 15, total: 30},
  // };
  // const total = Util.getUserCount2(barChartData, barKey);
  // const total = Util.getUserCount(barChartData);
  // const bars = Object.keys(barChartData).slice(0, 10).map( (dataKey, i) => (
  //   <Bar
  //     key={i}
  //     dataKey={"female"}
  //     fill={Util.FILLS[i]}
  //     maxBarSize={100}
  //     label
  //   />
  // ));
  // const legendStyle = {
  //   position: "absolute",
  //   width: "600px",
  //   height: "auto",
  //   left: "20px",
  //   bottom: "-5px"
  // };
  return (
    <article className="chart">
      <h2>{title}</h2>
      <BarChart
        width={600}
        height={300}
        data={Util.toArray(barChartData)}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis minTickGap={0} dataKey="name" tick={{strokeWidth: 1, width: 100, height: 20, color: "black"}}/>
        <YAxis
          tickFormatter={Util.getPercent.bind(null, 40)}
          interval="preserveStartEnd"
          allowDecimals={true}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip
          content={tooltipContent.bind(null, numUsers)}/>
        <Bar dataKey="female" fill={Util.FILLS[3]}/>
      </BarChart>
    </article>
  );
};
