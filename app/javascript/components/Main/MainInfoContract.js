import React, { useContext } from "react"
import { MenuContext, KWContext, AreaCodeContext} from '../View'
import { IsAmpereArea } from '../consts'

const MainInfoContract = () => {
  const [kw, setKW] = useContext(KWContext);
  const [menu, setMenu] = useContext(MenuContext);
  const [areaCode, setAreaCode] = useContext(AreaCodeContext);

  const handleChange=(e)=>{
    setKW(e.target.value);
  }


  let contractInput = []
  if (menu.contract_type === 1 && IsAmpereArea(areaCode) ) {
    contractInput.push(<option value="1" key="1">10A</option>)
    contractInput.push(<option value="1.5" key="1.5">15A</option>)
    for (let i = 2; i <= 6; i++) {
      contractInput.push(
      <option value={i} key={i}>{i}0A</option>
      )
    }
  } else if (menu.contract_type === 2) {
    for (let i = 6; i <= 49; i++) {
      contractInput.push(
      <option value={i} key={i}>{i}kVA</option>
      )
    }
  } else if (menu.contract_type === 3) {
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
    <>
      <div className="main_info_contract-title">契約容量</div>
      <div className="main_info_contract-input">
        <select name="contract_input" id="contract_input" onChange={handleChange}>
          <option value="">選択して下さい</option>
          {contractInput}
        </select>
      </div>
    </>
  );

}

export default MainInfoContract
