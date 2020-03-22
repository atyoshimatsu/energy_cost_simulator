import React from 'react'
import ReactDOM from 'react-dom'

class  ServiceTitle extends React.Component {
  render() {
    return(
      <div className="nav_title">enegy cost simulator</div>
    );
  }
}

class  Config extends React.Component {
  render() {
    return(
      <div className="nav_buttons_config">設定</div>
    );
  }
}

class  Logout extends React.Component {
  render() {
    return(
      <div className="nav_buttons_logout">logout</div>
    );
  }
}

class  Username extends React.Component {
  render() {
    return(
      <div className="nav_buttons_user-name">user name</div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('ServiceTitle');
  ReactDOM.render(
    <React.Fragment>
      <ServiceTitle />
      <div className="nav_buttons">
        <Config />
        <Logout />
        <Username />
      </div>
    </React.Fragment>,
    document.getElementsByClassName('nav')[0]
  )
})