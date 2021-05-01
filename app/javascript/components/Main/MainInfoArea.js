import React, {useContext,useState} from "react"
import { CompanyContext, AreaCodeContext, MenuesContext } from '../View'

const MainInfoArea = () => {
  const [company, setCompany] = useContext(CompanyContext);
  const [menues, setMenues] = useContext(MenuesContext);
  const [areaCode, setAreaCode] = useContext(AreaCodeContext);

  const handleChange=(e)=>{
    if (company.id != "" && e.target.value != "") {
      fetch(`/api/menu_search/menues?company_code=${company.id}&area_code=${e.target.value}`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        if (data.length != 0) {
          setMenues(data);
        }
      });
    }
    setAreaCode(e.target.value);
  }

  return (
    <>
      <div className="main_info_area-title">エリア</div>
      <div className="main_info_area">
        <select name="area" id="area" onChange={handleChange}>
          <option value="0">選択して下さい</option>
          <option value="1" key="1">北海道</option>
          <option value="2" key="2">東北</option>
          <option value="3" key="3">東京</option>
          <option value="4" key="4">中部</option>
          <option value="5" key="5">北陸</option>
          <option value="6" key="6">関西</option>
          <option value="7" key="7">中国</option>
          <option value="8" key="8">四国</option>
          <option value="9" key="9">九州</option>
          <option value="10" key="10">沖縄</option>
        </select>
      </div>
    </>
  );
}

export default MainInfoArea
