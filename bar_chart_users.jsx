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


export const BarChartUsers = ({barChartData, title}) => {

  const total = Util.getUserCount(barChartData);
  const bars = Object.keys(barChartData).slice(0, 10).map( (dataKey, i) => (
    <Bar
      key={i}
      dataKey={dataKey}
      fill={Util.FILLS[i]}
      maxBarSize={100}
    />
  ));
  const legendStyle = {
    position: "absolute",
    width: "600px",
    height: "auto",
    left: "20px",
    bottom: "-5px"
  };
  return (
    <article className="chart">
      <h2>{title}</h2>
      <BarChart
        width={600}
        height={300}
        data={[barChartData]}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis />
        <YAxis
          tickFormatter={Util.getPercent.bind(null, total)}
          interval="preserveStartEnd"
          allowDecimals={true}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip
          content={CustomChartProps.tooltipContent.bind(null, total)}/>
          {bars}
        <Legend
          width={600}
          />
      </BarChart>
    </article>
  );
};
