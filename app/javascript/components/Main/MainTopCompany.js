import React, { useContext, useState } from "react"
import { CompanyContext, MenuesContext, AreaCodeContext, NextMenuesContext, NextCompanyContext } from '../View'

const MainTopCompany = props => {
  const [company, setCompany] = useContext(CompanyContext);
  const [menues, setMenues] = useContext(MenuesContext);
  const [areaCode, setAreaCode] = useContext(AreaCodeContext);
  const [nextMenues, setNextMenues] = useContext(NextMenuesContext);
  const [nextCompany, setNextCompany] = useContext(NextCompanyContext);

  const [inputKeyword, setInputKeyword] = useState('');
  const [searchResultCompanies, setSearchResultCompanies] = useState(props.companies);
  // const [nextCompany, setNextCompany] = useState('');

  const handleChange=(e)=>{
    setInputKeyword(e.target.value);
  }

  const onKeyUpCompany=()=>{
    fetch(`/api/company_search/companies?keyword=${inputKeyword}`,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if (data.length == 0 && inputKeyword.length == 0) {
        setSearchResultCompanies(props.companies);
      } else {
        setSearchResultCompanies(data);
      }
    });
  }

  const onClickToBottom=(company)=>{
    setNextCompany(company);
    if (areaCode != "") {
      fetch(`/api/menu_search/menues?company_code=${company.id}&area_code=${areaCode}`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        if (data.length != 0) {
          setNextMenues(data);
        }
      });
    }
    $('html, body').animate({scrollTop:$('#main_bottom').offset().top - 50}, 400 , 'swing');
  }

  let serchResult = []
  let alertMessage = "";
  if (searchResultCompanies.length === 0) {
    alertMessage = (
      <div className="main_top_company-title_alert"> 電力会社がみつかりません</div>
    )
  } else {
    searchResultCompanies.forEach(company => {
      serchResult.push(
        <div className="card" key={company.id}>
          <img className="card-img-top" src={company.image} />
          <div className="card-body p-2">
            <a className="card-title" data-company-id={company.id} href={company.url} target="_blank">{company.name}</a>
            <div className="card-text">{company.text}</div>
            <div className="card-btn">
              <p></p>
              <div className="btn btn-secondary main_top_process_btn_to_bottom" onClick={onClickToBottom.bind(this, company)}>この会社と比較</div>
              <p></p>
            </div>
          </div>
        </div>
      )
    });
  }
  return (
    <>
      <div className="main_top_company">
        <div className="main_top_company-title">電力会社</div>
        {alertMessage}
      </div>
      <div className="main_top_company-search">
        <input className="main_top_company-search_form" onChange={handleChange} onKeyUp={onKeyUpCompany} placeholder=" ex. 東京電力" type="text" />
      </div>
      <div className="main_top_company-search_result">
        <div className="card-columns">
          {serchResult}
        </div>
      </div>
    </>
  );


}

export default MainTopCompany
