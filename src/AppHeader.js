import React, { Component } from 'react';
import fan from './images/fan-blades.png';
import flame from './images/blue-flame.png';
import poweredby from './images/poweredby-oneline-darkbackground.png';

class AppHeader extends Component {
  render() {
    return (
      <div className="App-header clearfix">
        <div className="App-header-logos">
          <img src={fan} className="App-logo App-spinning" alt="fan" />
          <img src={flame} className="App-logo" alt="flame" />
        </div>
        <div className="App-header-bannertext">
          <h2>HVAC Usage Monitor</h2>
          <a href="http://darksky.net/poweredby" target="_blank">
          <img src={poweredby} className="App-poweredby" alt="powered by DarkSky" />
          </a>
          <p className="App-header-developer">Developed by <a href="http://markjgreenwood.com" target="_blank">Mark Greenwood</a></p>
        </div>
      </div>
    );
  }
}

export default AppHeader;
