import React, { Component } from 'react';

import Header from './components/header'
import Projects from './components/projects'

import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faEnvelope, faDiscord, faGithub)


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Projects />
      </div>
    );
  }
}

export default App;
