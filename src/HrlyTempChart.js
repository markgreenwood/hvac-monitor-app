import React from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid } from 'recharts';

// const CustomizedAxisTick = React.createClass({
//   render () {
//     const {x, y, payload} = this.props;
		
//    	return (
//     	<g transform={`translate(${x},${y})`}>
//         <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>
//       </g>
//     );
//   }
// });

export default function HrlyTempChart(props) {
  const data = [...props.data];
  const width = props.width || 800;
  const height = props.height || 300;
  return (
    <LineChart width={width} height={height} data={data} margin={{top: 20, bottom: 40, left: 50, right: 40}}>
      <XAxis dataKey="date"/>
      <YAxis domain={['auto', 'auto']}/>
      <Line dataKey="temperature"/>
      <CartesianGrid strokeDasharray="3 3" />
      <ReferenceLine y={75} label="air" stroke="blue" strokeDasharray="3 3" />
      <ReferenceLine y={62} label="heat" stroke="red" strokeDasharray="3 3" />
    </LineChart>
  )
}