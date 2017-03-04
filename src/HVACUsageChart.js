import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

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
      <Bar dataKey="air" fill="#8884d8"/>
      <Bar dataKey="heat" fill="#82ca9d"/>
    </BarChart>
  );
}
