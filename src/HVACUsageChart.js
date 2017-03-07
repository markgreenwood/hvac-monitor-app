import React, { PropTypes } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid, Tooltip } from 'recharts';
import CustomizedAxisTick from './CustomizedAxisTick';

export default function HVACUsageChart(props) {
  const data = [...props.data];
  const width = props.width || 800;
  const height = props.height || 250;
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{top: 20, bottom: 40, left: 50, right: 40}}
      barGap={0}>
      <XAxis dataKey="date" tick={<CustomizedAxisTick/>}/>
      <YAxis label="Hrs/day" domain={[ 0, 24 ]}/>
      <Legend verticalAlign="top" layout="horizontal"/>
      <CartesianGrid vertical={false} strokeDasharray="3 3"/>
      <Tooltip/>
      <Bar dataKey="air" name="A/C" fill="#00ABB2"/>
      <Bar dataKey="heat" name="Heat" fill="#FF6A0A"/>
    </BarChart>
  );
}

HVACUsageChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}
