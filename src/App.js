import React, { Component } from 'react';
// import logo from './logo.svg';
import fan from './fan-blades.png';
import flame from './blue-flame.png';
import './App.css';
import moment from 'moment';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis } from 'recharts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatures: [],
      isLoading: false,
    };
  }

  doFetch(startDate, stopDate) {
    this.setState({ isLoading: true });

    fetch(`http://localhost:3030/api/temperature?start=${startDate}&stop=${stopDate}`)
      .then(res => res.json())
      .then(temps => this.setState({ temperatures: temps, isLoading: false }))
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.doFetch(moment('6/1/2016').valueOf(), moment('6/31/2016').valueOf());
  }

  render() {
    let temperatureData = 'Temperature data goes here.';
    if (this.state.isLoading) {
      temperatureData = 'Loading...';
    } else {
      temperatureData = <p>{JSON.stringify(this.state.temperatures)}</p>
    }

    const data = [
      {
        "date": "2016-06-01",
        "air": 6,
        "heat": 5
      },
      {
        "date": "2016-06-02",
        "air": 0,
        "heat": 10
      },
      {
        "date": "2016-06-03",
        "air": 10,
        "heat": 8
      },
      {
        "date": "2016-06-04",
        "air": 14,
        "heat": 0
      },
      {
        "date": "2016-06-05",
        "air": 16,
        "heat": 0
      },
      {
        "date": "2016-06-06",
        "air": 12,
        "heat": 0
      },
      {
        "date": "2016-06-07",
        "air": 9,
        "heat": 3
      },
      {
        "date": "2016-06-08",
        "air": 0,
        "heat": 6
      },
      {
        "date": "2016-06-09",
        "air": 0,
        "heat": 24
      },
      {
        "date": "2016-06-10",
        "air": 0,
        "heat": 23
      },
      {
        "date": "2016-06-11",
        "air": 0,
        "heat": 15
      },
      {
        "date": "2016-06-12",
        "air": 1,
        "heat": 12
      },
      {
        "date": "2016-06-13",
        "air": 0,
        "heat": 22
      },
      {
        "date": "2016-06-14",
        "air": 0,
        "heat": 24
      },
      {
        "date": "2016-06-15",
        "air": 0,
        "heat": 21
      },
      {
        "date": "2016-06-16",
        "air": 0,
        "heat": 16
      },
      {
        "date": "2016-06-17",
        "air": 0,
        "heat": 16
      },
      {
        "date": "2016-06-18",
        "air": 0,
        "heat": 17
      },
      {
        "date": "2016-06-19",
        "air": 5,
        "heat": 11
      },
      {
        "date": "2016-06-20",
        "air": 5,
        "heat": 9
      },
      {
        "date": "2016-06-21",
        "air": 0,
        "heat": 10
      },
      {
        "date": "2016-06-22",
        "air": 4,
        "heat": 10
      },
      {
        "date": "2016-06-23",
        "air": 0,
        "heat": 18
      },
      {
        "date": "2016-06-24",
        "air": 0,
        "heat": 13
      },
      {
        "date": "2016-06-25",
        "air": 5,
        "heat": 10
      },
      {
        "date": "2016-06-26",
        "air": 12,
        "heat": 5
      },
      {
        "date": "2016-06-27",
        "air": 9,
        "heat": 0
      },
      {
        "date": "2016-06-28",
        "air": 5,
        "heat": 10
      },
      {
        "date": "2016-06-29",
        "air": 4,
        "heat": 12
      },
      {
        "date": "2016-06-30",
        "air": 3,
        "heat": 10
      }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={fan} className="App-logo App-logo-spinning" alt="logo" />
          <img src={flame} className="App-logo" alt="logo" />
          <h2>HVAC Monitor</h2>
        </div>
        <p className="App-intro">
          Monitor HVAC usage here.
        </p>
        <LineChart
          width={800}
          height={200}
          data={this.state.temperatures}>
          <XAxis dataKey="time"/>
          <YAxis/>
          <Line dataKey="temperature"/>
        </LineChart>
        <BarChart
          width={800}
          height={300}
          data={data}
          barCategoryGap={1}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Bar dataKey="air" fill="#8884d8"/>
          <Bar dataKey="heat" fill="#82ca9d"/>
        </BarChart>
      </div>
    );
  }
}

export default App;
