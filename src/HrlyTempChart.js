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
    <LineChart width={width} height={height} data={data} margin={{top: 40, bottom: 40, left: 50, right: 40}}>
      <XAxis dataKey="date"/>
      <YAxis domain={['auto', 'auto']} label="Degrees F"/>
      <Line dataKey="temperature"/>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <ReferenceLine y={75} label="A/C" stroke="#00ABB2" strokeDasharray="3 3" />
      <ReferenceLine y={62} label="Heat" stroke="#FF6A0A" strokeDasharray="3 3" />
    </LineChart>
  )
}