import React, { Component } from 'react';
import fan from './images/fan-blades.png';
import flame from './images/blue-flame.png';
import spinner from './images/spinner.gif';
import poweredby from './images/poweredby-oneline-darkbackground.png';
import moment from 'moment';
import HrlyTempChart from './HrlyTempChart';
import HVACUsageChart from './HVACUsageChart';
import DatePicker from 'react-datepicker';
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
      startDate: moment('6/1/2016'),
      endDate: moment('6/1/2016').add(29,'days'),
    };
  }

  doFetch() {
    const { startDate, endDate } = this.state;
    this.setState({ isLoading: true });

    fetch(`/api/temperature?start=${startDate.valueOf()}&stop=${endDate.valueOf()}`)
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
          <HrlyTempChart data={this.state.temperatures} />
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-logos">
            <img src={fan} className="App-logo App-spinning" alt="fan" />
            <img src={flame} className="App-logo" alt="flame" />
          </div>
          <div className="App-header-bannertext">
            <h2>HVAC Usage Monitor</h2>
            <img src={poweredby} className="App-poweredby" alt="powered by DarkSky" />
          </div>
        </div>
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
