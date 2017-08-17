import React, { Component } from 'react'
import { connect } from 'react-redux'
import getWeb3 from './utils/getWeb3'
import propTypes from 'prop-types'
import { Route, Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/App.css'
import 'semantic-ui-css/semantic.min.css';

import LotteryContainer from './Containers/LotteryContainer'
import HomeContainer from './Containers/HomeContainer'
class App extends Component {
  static propTypes = {
    lottery: propTypes.shape({ deployed: propTypes.bool })
  }

  componentDidMount() {
    this.load()
  }
  async load(){
    const Web3API = new getWeb3()
    Web3API.deployContract();
  }
  

  render() {
    if (!this.props.lottery.deployed)
      return null

    return (
      <div>
        <Router history={createBrowserHistory()}>
          <div>
            <Route exact path="/" component={HomeContainer}/>
            <Route path="/Lottery" component={LotteryContainer}/>
          </div>
        </Router>
      </div>
      
    );
  }
}

function mapStateToProps({ web3State: { lottery }}) {
  return { lottery }
}
export default connect(mapStateToProps)(App)
