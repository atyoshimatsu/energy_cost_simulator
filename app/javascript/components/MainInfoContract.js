import React from "react"
import PropTypes from "prop-types"
class MainInfoContract extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      kW: "",
    };
  }

  handleChange=(e)=>{
    this.props.updateKW({kW: e.target.value});
  }

  render () {
    let contractInput = []
    if (this.props.contractType == 1 && ["6", "7", "8"].indexOf(this.props.areaCode) == -1 ) {
      contractInput.push(<option value="1" key="1">10A</option>)
      contractInput.push(<option value="1.5" key="1.5">15A</option>)
      for (let i = 2; i <= 6; i++) {
        contractInput.push(
        <option value={i} key={i}>{i}0A</option>
        )
      }
    } else if (this.props.contractType == 2) {
      for (let i = 6; i <= 49; i++) {
        contractInput.push(
        <option value={i} key={i}>{i}kVA</option>
        )
      }
    } else if (this.props.contractType == 3) {
      contractInput.push(
        <option value="0.5" key="0.5">0.5kW</option>
      )
      for (let i = 1; i <= 49; i++) {
        contractInput.push(
        <option value={i} key={i}>{i}kW</option>
        )
      }
    }
    return (
      <React.Fragment>
        <div className="main_info_contract-title">契約容量</div>
        <div className="main_info_contract-input">
          <select name="contract_input" id="contract_input" onChange={this.handleChange}>
            <option value="">選択して下さい</option>
            {contractInput}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default MainInfoContract
