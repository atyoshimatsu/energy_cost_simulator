import React from 'react'
import ReactDOM from 'react-dom'

class  ServiceTitle extends React.Component {
  render() {
    return(
      <div className="service_title">enegy cost simulator</div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('ServiceTitle');
  ReactDOM.render(
    <ServiceTitle />,
    document.getElementsByClassName('nav')[0].appendChild(document.createElement('div'))
  )
})