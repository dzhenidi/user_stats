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


export const BarChartUsers = ({barChartData, title}) => {

  const total = Util.getUserCount(barChartData);
  const bars = Object.keys(barChartData).slice(0, 10).map( (dataKey, i) => (
    <Bar
      key={i}
      dataKey={dataKey}
      fill={Util.FILLS[i]}
      maxBarSize={30}
    />
  ));
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
        data={[barChartData]}
        margin={{top: 5, right: 20, left: 20, bottom: 5}}
        barGap={5}
        >
        <XAxis tickLine={false} tick={false}/>
        <YAxis
          tickFormatter={Util.getPercent.bind(null, total)}
          domain={[0, 'dataMax + 1']}
          />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip
          content={tooltipContent.bind(null, total)}
          wrapperStyle={{padding: '10px', backgroundColor: '#fff', border: '2px solid #d3d3d3', borderRadius: '5px'}}
          />
        {bars}
        <Legend
          layout="horizontal"
          align="left"
          width={550}
          wrapperStyle={{left: 50, bottom: -4}}
          />
      </BarChart>
    </article>
  );
};
