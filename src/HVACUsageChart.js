import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';

export default function HVACUsageChart(props) {
  const data = [...props.data];
  const width = props.width || 800;
  const height = props.height || 300;
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{top: 20, bottom: 40, left: 50, right: 40}}
      barCategoryGap={0}>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Legend verticalAlign="top"/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Bar dataKey="air" fill="blue"/>
      <Bar dataKey="heat" fill="orange"/>
    </BarChart>
  );
}
