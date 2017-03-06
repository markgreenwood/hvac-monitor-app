import React from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip } from 'recharts';

const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
		
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-40)">{moment(payload.value).format('MM/DD/YYYY')}</text>
      </g>
    );
  }
});

export default function HrlyTempChart(props) {
  const data = [...props.data]; // flatten the data
  const width = props.width || 800;
  const height = props.height || 250;
  return (
    <LineChart width={width} height={height} data={data} margin={{top: 40, bottom: 50, left: 50, right: 40}}>
      <XAxis dataKey="time" tick={<CustomizedAxisTick/>}/>
      <YAxis domain={['auto', 'auto']} label="Degrees F"/>
      <Line dataKey="temperature"/>
      <Tooltip/>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <ReferenceLine y={75} label="A/C" stroke="#00ABB2" strokeDasharray="3 3" />
      <ReferenceLine y={62} label="Heat" stroke="#FF6A0A" strokeDasharray="3 3" />
    </LineChart>
  )
}