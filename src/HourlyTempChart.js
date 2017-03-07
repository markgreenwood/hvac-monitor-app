import React, { Component, PropTypes } from 'react';
import CustomizedAxisTick from './CustomizedAxisTick';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip } from 'recharts';
import './HourlyTempChart.css';
import moment from 'moment';

class HourlyTemperatureCursor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="hourly-temperature-cursor">
          <p className="label">{`Time: ${moment(new Date(label)).format('MM/DD/YY h:mm a')}`}</p>
          <p className="value">{`Temperature: ${payload[0].value} F`}</p>
        </div>
      );
    }

    return null;
  }
}

export default function HourlyTempChart(props) {
  const data = [...props.data]; // flatten the data
  const width = props.width || 800;
  const height = props.height || 250;
  return (
    <LineChart width={width} height={height} data={data} margin={{top: 40, bottom: 50, left: 50, right: 40}}>
      <XAxis dataKey="time" tick={<CustomizedAxisTick/>}/>
      <YAxis domain={['auto', 'auto']} label="Degrees F"/>
      <Line dataKey="temperature"/>
      <Tooltip content={<HourlyTemperatureCursor/>}/>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <ReferenceLine y={75} label="A/C" stroke="#00ABB2" strokeDasharray="3 3" />
      <ReferenceLine y={62} label="Heat" stroke="#FF6A0A" strokeDasharray="3 3" />
    </LineChart>
  )
}

HourlyTempChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};