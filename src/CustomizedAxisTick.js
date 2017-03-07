import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class CustomizedAxisTick extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {x, y, stroke, payload} = this.props;
		
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-40)">{moment(payload.value).format('MM/DD/YYYY')}</text>
      </g>
    );
  }
}

export default CustomizedAxisTick;