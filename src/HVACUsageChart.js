import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

export default function HVACUsageChart(props) {
  const data = [...props.data];
  const width = props.width || 800;
  const height = props.height || 300;
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      barCategoryGap={0}>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Legend verticalAlign="top"/>
      <Bar dataKey="air" fill="blue"/>
      <Bar dataKey="heat" fill="orange"/>
    </BarChart>
  );
}
