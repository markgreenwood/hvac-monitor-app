import React, { Component } from 'react';
import fan from './fan-blades.png';
import flame from './blue-flame.png';
import spinner from './spinner.gif';
import moment from 'moment';
import HrlyTempChart from './HrlyTempChart';
import HVACUsageChart from './HVACUsageChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const apiUrl = process.env.APIURL || 'http://localhost:3030/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: [],
      hvacUsage: [],
      isLoading: false,
      startDate: moment(),
      endDate: moment(),
    };
  }

  doFetch() {
    const { startDate, endDate } = this.state;
    this.setState({ isLoading: true });

    fetch(`${apiUrl}/temperature?start=${startDate.valueOf()}&stop=${endDate.valueOf()}`)
      .then(res => res.json())
      .then(values => {
        this.setState({ temperatures: values.reduce((acc, curr) => acc.concat(curr.tempdata), []), isLoading: true });
        return values;
      })
      .then(values => {
        let usageData = values.map(dailyData => dailyData.tempdata.reduce((acc, curr) => {
          if (curr.temperature > 75) { acc.air++ }
          else if (curr.temperature < 62) { acc.heat++ }
          return acc;
        }, { date: dailyData.date, air: 0, heat: 0 }));

        this.setState({ hvacUsage: usageData, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.doFetch();
  }

  handleStartDate(date) {
    this.setState({ startDate: date });
    this.doFetch();
  }

  handleEndDate(date) {
    this.setState({ endDate: date });
    this.doFetch();
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
          <h2>HVAC Usage Monitor</h2>
        </div>
        <p className="App-intro">
          HVAC usage patterns at PDX (Portland International Airport)
        </p>
        <span>From: </span><DatePicker selected={this.state.startDate} onChange={ (date) => this.handleStartDate(date) }/>
        <span> To: </span><DatePicker selected={this.state.endDate} onChange={ (date) => this.handleEndDate(date) }/>
        {dataDisplay}
      </div>
    );
  }
}

export default App;
