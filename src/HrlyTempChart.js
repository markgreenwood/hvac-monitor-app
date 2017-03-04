import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export default function HrlyTempChart(props) {
  const data = [...props.data];
  const width = props.width || 800;
  const height = props.height || 200;
  return (
    <LineChart
      width={width}
      height={height}
      data={data}>
      <XAxis dataKey="time"/>
      <YAxis/>
      <Line dataKey="temperature"/>
    </LineChart>
  )
}