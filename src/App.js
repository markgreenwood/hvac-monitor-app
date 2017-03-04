import React, { Component } from 'react';
import fan from './fan-blades.png';
import flame from './blue-flame.png';
import spinner from './spinner.gif';
import moment from 'moment';
import HrlyTempChart from './HrlyTempChart';
import HVACUsageChart from './HVACUsageChart';
import usageData from './usage-data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: [],
      hvacUsage: [],
      isLoading: false,
    };
  }

  doFetch(startDate, stopDate) {
    this.setState({ isLoading: true });

    fetch(`http://localhost:3030/api/temperature?start=${startDate}&stop=${stopDate}`)
      .then(res => res.json())
      .then(values => {
        this.setState({ temperatures: values.reduce((acc, curr) => acc.concat(curr), []), isLoading: false });
        return values;
      })
      // .then(values => {
      //   let usageData = values.map(dailyData => dailyData.reduce((acc, curr) => {
      //     if (curr.temperature > 75) { acc.air++ }
      //     else if (curr.temperature < 62) { acc.heat++ }
      //     return acc;
      //   }, { date: dailyData.date, air: 0, heat: 0 }));

      //   this.setState({ hvacUsage: usageData, isLoading: false });
      // })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.doFetch(moment('6/1/2016').valueOf(), moment('6/30/2016').valueOf());
    this.setState({ hvacUsage: usageData });
  }

  render() {
    let dataDisplay = '';
    if (this.state.isLoading) {
      dataDisplay = (
        <div>
          <p>Loading data...</p>
          <img src={spinner} role="presentation" className="App-logo App-spinning"/>
        </div>
      );
    } else {
      dataDisplay = (
        <div>
          <HrlyTempChart data={this.state.temperatures} />
          <HVACUsageChart data={this.state.hvacUsage} />
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={fan} className="App-logo App-spinning" alt="fan" />
          <img src={flame} className="App-logo" alt="flame" />
          <h2>HVAC Monitor</h2>
        </div>
        <p className="App-intro">
          HVAC usage patterns at PDX (Portland International Airport)
        </p>
        {dataDisplay}
      </div>
    );
  }
}

export default App;
