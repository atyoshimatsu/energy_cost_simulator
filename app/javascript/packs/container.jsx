import React from 'react'
import ReactDOM from 'react-dom'

class Nav extends React.Component {
  render() {
    console.log('Nav');
    return(
      <div className="nav">
        Enegy cost simulator
      </div>
    );
  }
}

class Sidebar extends React.Component {
  render() {
    return(
      <div className="sidebar">example</div>
    );
  }
}

class MainTop extends React.Component {
  render() {
    return(
      <div className="main_top">example</div>
    );
  }
}

class MainBottom extends React.Component {
  render() {
    return(
      <div className="main_bottom">example</div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.Fragment>
      <Nav />
      <div className='wrapper'>
        <Sidebar />
        <div className='main'>
          <MainTop />
          <MainBottom />
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('container')
  )
})