import React, { Component } from 'react';
import spinner from './images/spinner.gif';
import moment from 'moment';
import HourlyTempChart from './HourlyTempChart';
import HVACUsageChart from './HVACUsageChart';
import DatePicker from 'react-datepicker';
import AppHeader from './AppHeader';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.state = {
      temperatures: [],
      hvacUsage: [],
      isLoading: false,
      startDate: moment(new Date('6/1/2016')),
      endDate: moment(new Date('6/1/2016')).add(29,'days'),
    };
  }

  doFetch() {
    const { startDate, endDate } = this.state;
    this.setState({ isLoading: true });

    fetch(`/api/temperature?start=${startDate.valueOf()}&end=${endDate.valueOf()}`)
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
    const start = date.clone();
    const end = start.clone().add(29, 'days');
    this.setState({ startDate: start, endDate: end }, () => this.doFetch());
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
          <hr/>
          <p className="graph-title">HVAC System Usage</p>
          <HVACUsageChart data={this.state.hvacUsage} />
          <hr/>
          <p className="graph-title">Hourly Temperature</p>
          <HourlyTempChart data={this.state.temperatures} />
        </div>
      );
    }

    return (
      <div className="App">
        <AppHeader/>
        <p className="App-intro">
          HVAC usage patterns at PDX (Portland International Airport)
        </p>
        <span>30-day span from: </span><DatePicker selected={this.state.startDate} onChange={ this.handleStartDate }/>
        {dataDisplay}
      </div>
    );
  }
}


export default App;
