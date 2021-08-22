import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { StateContext } from '../context/context';

const MainTopCompany = (props) => {
  const { companies } = props;
  const [state, setState] = useContext(StateContext);

  const [inputKeyword, setInputKeyword] = useState('');
  const [searchResultCompanies, setSearchResultCompanies] = useState(companies);

  const handleChange = (e) => {
    setInputKeyword(e.target.value);
  };

  const onKeyUpCompany = async () => {
    await fetch(`/api/company_search/companies?keyword=${inputKeyword}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0 && inputKeyword.length === 0) {
          setSearchResultCompanies(companies);
        } else {
          setSearchResultCompanies(data);
        }
      });
  };

  const onClickToBottom = async (company) => {
    let selectedNextMenues = [];
    if (state.areaCode !== '') {
      await fetch(`/api/menu_search/menues?company_code=${company.id}&area_code=${state.areaCode}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            selectedNextMenues = data;
          }
        });
    }
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
    setState({ ...state, nextCompany: company, nextMenues: selectedNextMenues });
  };

  const serchResult = [];
  let alertMessage = '';
  if (searchResultCompanies.length === 0) {
    alertMessage = (
      <div className="main_top_company-title_alert"> 電力会社がみつかりません</div>
    );
  } else {
    searchResultCompanies.forEach((company) => {
      serchResult.push(
        <div className="card" key={company.id}>
          <img className="card-img-top" src={company.image} alt="会社ロゴ" />
          <div className="card-body p-2">
            <a className="card-title" data-company-id={company.id} href={company.url} target="_blank" rel="noreferrer">{company.name}</a>
            <div className="card-text">{company.text}</div>
            <div className="card-btn">
              <p />
              <div className="btn btn-secondary main_top_process_btn_to_bottom" onClick={onClickToBottom.bind(this, company)} onKeyPress={onClickToBottom.bind(this, company)} role="button" tabIndex="0">この会社と比較</div>
              <p />
            </div>
          </div>
        </div>,
      );
    });
  }
  return (
    <>
      <div className="main_top_company">
        <div className="main_top_company-title">電力会社</div>
        {alertMessage}
      </div>
      <div className="main_top_company-search">
        <input className="main_top_company-search_form" onChange={handleChange} onKeyUp={onKeyUpCompany} placeholder=" ex. 東京電力エナジーパートナー" type="text" />
      </div>
      <div className="main_top_company-search_result">
        <div className="card-columns">
          {serchResult}
        </div>
      </div>
    </>
  );
};

MainTopCompany.propTypes = {
  companies: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    image: propTypes.string,
    text: propTypes.string,
    title: propTypes.string,
    url: propTypes.string,
    created_at: propTypes.string,
    updated_at: propTypes.string,
  })).isRequired,
};
export default MainTopCompany;
